// ==================== Bookmarks ====================

const Bookmarks = {
    bookmarks: new Set(),

    init() {
        this.loadBookmarks();
        this.updateBadge();
    },

    loadBookmarks() {
        const saved = localStorage.getItem('bookmarks');
        if (saved) {
            try {
                this.bookmarks = new Set(JSON.parse(saved));
            } catch (e) {
                this.bookmarks = new Set();
            }
        }
    },

    saveBookmarks() {
        localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarks]));
        this.updateBadge();
    },

    toggle(id) {
        if (this.bookmarks.has(id)) {
            this.remove(id);
        } else {
            this.add(id);
        }
    },

    add(id) {
        this.bookmarks.add(id);
        this.saveBookmarks();
        this.updateButton(id, true);
        App.showToast('تمت الإضافة إلى المفضلة ⭐');
    },

    remove(id) {
        this.bookmarks.delete(id);
        this.saveBookmarks();
        this.updateButton(id, false);
        App.showToast('تمت الإزالة من المفضلة');
    },

    has(id) {
        return this.bookmarks.has(id);
    },

    getAll() {
        return [...this.bookmarks];
    },

    clearAll() {
        if (confirm('هل أنت متأكد من حذف جميع المفضلات؟')) {
            this.bookmarks.clear();
            this.saveBookmarks();
            this.updateAllButtons();
            App.showToast('تم مسح جميع المفضلات');

            // Reload bookmarks section if currently viewing
            if (App.currentSection === 'bookmarks') {
                App.loadSection('bookmarks');
            }
        }
    },

    updateButton(id, isBookmarked) {
        const button = document.querySelector(`.bookmark-btn[data-id="${id}"]`);
        if (button) {
            if (isBookmarked) {
                button.textContent = '★';
                button.classList.add('bookmarked');
            } else {
                button.textContent = '☆';
                button.classList.remove('bookmarked');
            }
        }
    },

    updateAllButtons() {
        const buttons = document.querySelectorAll('.bookmark-btn');
        buttons.forEach(button => {
            const id = button.dataset.id;
            const isBookmarked = this.has(id);

            if (isBookmarked) {
                button.textContent = '★';
                button.classList.add('bookmarked');
            } else {
                button.textContent = '☆';
                button.classList.remove('bookmarked');
            }
        });
    },

    updateBadge() {
        const badge = document.getElementById('bookmarkCount');
        if (badge) {
            const count = this.bookmarks.size;
            badge.textContent = count;

            if (count > 0) {
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    },

    export() {
        const data = {
            bookmarks: this.getAll(),
            exportDate: new Date().toISOString()
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `qudrat-bookmarks-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);
        App.showToast('تم تصدير المفضلات');
    },

    import(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.bookmarks && Array.isArray(data.bookmarks)) {
                    this.bookmarks = new Set(data.bookmarks);
                    this.saveBookmarks();
                    this.updateAllButtons();
                    App.showToast('تم استيراد المفضلات بنجاح');
                } else {
                    App.showToast('ملف غير صالح');
                }
            } catch (error) {
                App.showToast('خطأ في قراءة الملف');
            }
        };

        reader.readAsText(file);
    }
};

// Initialize bookmarks
Bookmarks.init();
