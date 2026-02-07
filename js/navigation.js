// ==================== Navigation ====================

const Navigation = {
    init() {
        this.setupNavLinks();
        this.handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    },

    setupNavLinks() {
        // Setup sidebar nav
        const sidebarItems = document.querySelectorAll('.sidebar .nav-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.goTo(section);
            });
        });

        // Setup bottom nav
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
        bottomNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.goTo(section);
            });
        });
    },

    goTo(sectionName) {
        // Update URL hash
        window.location.hash = sectionName;

        // Update active states
        this.updateActiveStates(sectionName);

        // Load content
        App.loadSection(sectionName);

        // Scroll to top
        window.scrollTo(0, 0);
    },

    handleHashChange() {
        const hash = window.location.hash.slice(1) || 'home';
        this.updateActiveStates(hash);

        // Only load section if it's different from current
        if (App.currentSection !== hash) {
            App.loadSection(hash);
        }
    },

    updateActiveStates(sectionName) {
        // Update sidebar navigation
        const sidebarItems = document.querySelectorAll('.sidebar .nav-item');
        sidebarItems.forEach(item => {
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update bottom navigation
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
        bottomNavItems.forEach(item => {
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update page title
        const titles = {
            home: 'دليل القدرات | الرئيسية',
            verbal: 'دليل القدرات | القسم اللفظي',
            quantitative: 'دليل القدرات | القسم الكمي',
            geometry: 'دليل القدرات | الهندسة',
            algebra: 'دليل القدرات | الجبر والإحصاء',
            strategies: 'دليل القدرات | استراتيجيات النجاح',
            bookmarks: 'دليل القدرات | المفضلة',
            more: 'دليل القدرات | المزيد'
        };

        document.title = titles[sectionName] || 'دليل القدرات';
    },

    getPreviousSection() {
        const sections = ['home', 'verbal', 'quantitative', 'geometry', 'algebra', 'strategies'];
        const currentIndex = sections.indexOf(App.currentSection);

        if (currentIndex > 0) {
            return sections[currentIndex - 1];
        }

        return null;
    },

    getNextSection() {
        const sections = ['home', 'verbal', 'quantitative', 'geometry', 'algebra', 'strategies'];
        const currentIndex = sections.indexOf(App.currentSection);

        if (currentIndex >= 0 && currentIndex < sections.length - 1) {
            return sections[currentIndex + 1];
        }

        return null;
    }
};

// Initialize navigation
Navigation.init();
