// ==================== Search ====================

const Search = {
    isOpen: false,
    searchData: [],

    init() {
        this.setupEventListeners();
        this.buildSearchIndex();
    },

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchCloseBtn = document.getElementById('searchCloseBtn');

        // Search input
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Close button
        searchCloseBtn.addEventListener('click', () => {
            this.close();
        });

        // Close on escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    buildSearchIndex() {
        // This is a simplified search index
        // In a real app, you would extract this from your actual content
        this.searchData = [
            // Verbal
            { id: 'v1', title: 'اختصار احصد', content: 'استيعاب المقروء - اقرأ السؤال، حدد نوع السؤال، صوّب على الإجابة، دقق في الخيارات', section: 'verbal' },
            { id: 'v2', title: 'كلهم إلا', content: 'إكمال الجمل - كرر قراءة الجملة، لاحظ الروابط، هات الكلمة المناسبة، مرر على الخيارات', section: 'verbal' },
            { id: 'v3', title: 'التناظر اللفظي', content: 'الجزء بالكل، الترادف، التضاد، السبب والنتيجة، الوظيفة، المكان', section: 'verbal' },

            // Quantitative
            { id: 'q1', title: 'الضرب في ١١', content: '٢٣ × ١١ = ٢(٢+٣)٣ = ٢٥٣', section: 'quantitative' },
            { id: 'q2', title: 'تربيع عدد ينتهي بـ ٥', content: '٢٥² = (٢ × ٣)٢٥ = ٦٢٥', section: 'quantitative' },
            { id: 'q3', title: 'قوانين الأسس', content: 'أ^م × أ^ن = أ^(م + ن)، أ^م ÷ أ^ن = أ^(م − ن)، (أ^م)^ن = أ^(م × ن)', section: 'quantitative' },
            { id: 'q4', title: 'النسبة المئوية', content: '١٠٪ = القسمة على ١٠، ٥٪ = نصف الـ ١٠٪، ٢٠٪ = القسمة على ٥', section: 'quantitative' },

            // Geometry
            { id: 'g1', title: 'نظرية فيثاغورس', content: 'أ² + ب² = ﺟ² - المثلثات الشهيرة: (٣،٤،٥) | (٥،١٢،١٣) | (٨،١٥،١٧)', section: 'geometry' },
            { id: 'g2', title: 'مساحة المثلث', content: 'المساحة = (القاعدة × الارتفاع) ÷ ٢', section: 'geometry' },
            { id: 'g3', title: 'مساحة الدائرة', content: 'المساحة = ط × نق² حيث ط ≈ ٣٫١٤', section: 'geometry' },
            { id: 'g4', title: 'محيط الدائرة', content: 'المحيط = ٢ × ط × نق = ط × القطر', section: 'geometry' },
            { id: 'g5', title: 'مساحة المربع', content: 'المساحة = الضلع²، المحيط = ٤ × الضلع', section: 'geometry' },

            // Algebra
            { id: 'a1', title: 'مربع المجموع', content: '(أ + ب)² = أ² + ٢أب + ب²', section: 'algebra' },
            { id: 'a2', title: 'مربع الفرق', content: '(أ − ب)² = أ² − ٢أب + ب²', section: 'algebra' },
            { id: 'a3', title: 'الفرق بين مربعين', content: '(أ + ب)(أ − ب) = أ² − ب²', section: 'algebra' },
            { id: 'a4', title: 'المتوسط الحسابي', content: 'المتوسط = مجموع القيم ÷ عددها', section: 'algebra' },
            { id: 'a5', title: 'الاحتمال', content: 'الاحتمال = عدد الحالات المرغوبة ÷ عدد الحالات الممكنة', section: 'algebra' },

            // Strategies
            { id: 's1', title: 'إدارة الوقت', content: '٢٤ سؤال في ٢٥ دقيقة - متوسط دقيقة لكل سؤال', section: 'strategies' },
            { id: 's2', title: 'تقنية الاستبعاد', content: 'احذف المستحيل، احذف المتناقض، احذف المتشابه جداً، اختر من الباقي', section: 'strategies' },
            { id: 's3', title: 'ليلة الاختبار', content: 'نم ٨ ساعات، لا تذاكر جديد، راجع الاختصارات', section: 'strategies' }
        ];
    },

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.isOpen = true;
        const searchContainer = document.getElementById('searchContainer');
        const searchInput = document.getElementById('searchInput');

        searchContainer.style.display = 'block';
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    },

    close() {
        this.isOpen = false;
        const searchContainer = document.getElementById('searchContainer');
        const searchResults = document.getElementById('searchResults');
        const searchInput = document.getElementById('searchInput');

        searchContainer.style.display = 'none';
        searchResults.style.display = 'none';
        searchInput.value = '';
    },

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');

        if (!query || query.trim().length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.content}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item">
                    <div class="search-result-title">لم يتم العثور على نتائج</div>
                    <div class="search-result-content">جرّب كلمات أخرى</div>
                </div>
            `;
            searchResults.style.display = 'block';
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item" onclick="Search.goToResult('${result.section}')">
                <div class="search-result-title">${this.highlightText(result.title, query)}</div>
                <div class="search-result-content">${this.highlightText(result.content, query)}</div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
        searchResults.style.display = 'block';
    },

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong style="color: var(--primary); background: var(--primary-light);">$1</strong>');
    },

    goToResult(section) {
        this.close();
        Navigation.goTo(section);
        App.showToast('تم الانتقال إلى القسم');
    }
};

// Initialize search
Search.init();
