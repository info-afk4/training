// ==================== App Initialization ====================

const App = {
    currentSection: 'home',
    darkMode: false,

    init() {
        this.loadDarkModePreference();
        this.setupEventListeners();
        this.loadSection('home');
        this.checkInstallPrompt();
    },

    setupEventListeners() {
        // Dark mode toggle
        document.getElementById('darkModeBtn').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Menu button (mobile)
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Overlay click
        document.getElementById('overlay').addEventListener('click', () => {
            this.closeSidebar();
        });

        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => {
            Search.toggle();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                Search.close();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeSidebar();
            }
        });
    },

    loadSection(sectionName) {
        this.currentSection = sectionName;
        const mainContent = document.getElementById('mainContent');

        // Show loading
        mainContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>جاري التحميل...</p>
            </div>
        `;

        // Simulate loading (replace with actual content loading)
        setTimeout(() => {
            mainContent.innerHTML = this.getSectionContent(sectionName);
            this.setupSectionInteractions();
            this.closeSidebar();
            window.scrollTo(0, 0);
        }, 300);
    },

    getSectionContent(sectionName) {
        const sections = {
            home: this.getHomeContent(),
            verbal: this.getVerbalContent(),
            quantitative: this.getQuantitativeContent(),
            geometry: this.getGeometryContent(),
            algebra: this.getAlgebraContent(),
            strategies: this.getStrategiesContent(),
            bookmarks: this.getBookmarksContent(),
            more: this.getMoreContent()
        };

        return sections[sectionName] || sections.home;
    },

    getHomeContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">🎯 مرحباً بك في دليل القدرات</h1>
                <p class="section-description">دليلك الشامل للتفوق في اختبار القدرات العامة</p>

                <div class="cards-grid">
                    <div class="card" onclick="Navigation.goTo('verbal')">
                        <div class="card-header">
                            <span>📖 القسم اللفظي</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>استيعاب المقروء، إكمال الجمل، التناظر اللفظي، الخطأ السياقي، الارتباط والاختلاف</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('quantitative')">
                        <div class="card-header">
                            <span>🔢 القسم الكمي</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>الحساب، الكسور، المعادلات، الأسس، الجذور، النسب والتناسب</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('geometry')">
                        <div class="card-header">
                            <span>📐 الهندسة</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>الزوايا، المثلثات، الدوائر، المربعات، المستطيلات مع رسومات توضيحية</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('algebra')">
                        <div class="card-header">
                            <span>🧮 الجبر والإحصاء</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>المتطابقات، الاحتمالات، الإحصاء، المتوسطات</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('strategies')">
                        <div class="card-header">
                            <span>⚡ استراتيجيات النجاح</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>إدارة الوقت، تقنية الاستبعاد، نصائح ذهبية للدرجة الكاملة</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('bookmarks')">
                        <div class="card-header">
                            <span>⭐ المفضلة</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>القوانين والاختصارات المحفوظة للمراجعة السريعة</p>
                        </div>
                    </div>
                </div>

                <div class="rule-box">
                    <div class="rule-title">💡 نصيحة اليوم</div>
                    <div class="rule-content">
                        <p>ابدأ بمراجعة القسم الأضعف لديك، واستخدم تقنية الفواصل الزمنية للمراجعة (Spaced Repetition) لتثبيت المعلومات</p>
                    </div>
                </div>
            </div>
        `;
    },

    getVerbalContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">📖 القسم اللفظي</h1>
                <p class="section-description">جميع الطرق والاختصارات للقسم اللفظي</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. اختصار احصد - استيعاب المقروء</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('verbal-1')" data-id="verbal-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">احصد: الطريقة المختصرة لحل القطع</div>
                            <div class="rule-content">
                                <ul>
                                    <li><strong>ا - اقرأ السؤال:</strong> ابدأ بقراءة السؤال قبل القطعة</li>
                                    <li><strong>ح - حدد نوع السؤال:</strong> (ضمير، معنى، علاقة، معلومة، قرون، فكرة، فهم)</li>
                                    <li><strong>ص - صوّب على الإجابة:</strong> اقرأ الجزء المطلوب فقط من القطعة</li>
                                    <li><strong>د - دقق في الخيارات:</strong> استبعد الخيارات الخاطئة</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. اختصار كلهم إلا - إكمال الجمل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('verbal-2')" data-id="verbal-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">كلهم إلا: طريقة الاستبعاد السريع</div>
                            <div class="rule-content">
                                <ul>
                                    <li><strong>ك - كرر قراءة الجملة:</strong> افهم السياق العام</li>
                                    <li><strong>ل - لاحظ الروابط:</strong> (لكن، إلا، رغم، مع)</li>
                                    <li><strong>ه - هات الكلمة المناسبة:</strong> قبل قراءة الخيارات</li>
                                    <li><strong>م - مرر على الخيارات:</strong> اختر الأقرب لتوقعك</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. التناظر اللفظي</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('verbal-3')" data-id="verbal-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">أنواع العلاقات</div>
                            <div class="rule-content">
                                <ul>
                                    <li>علاقة الجزء بالكل (يد : جسم)</li>
                                    <li>علاقة الترادف (بيت : منزل)</li>
                                    <li>علاقة التضاد (حار : بارد)</li>
                                    <li>علاقة السبب والنتيجة (مطر : فيضان)</li>
                                    <li>علاقة الوظيفة (قلم : كتابة)</li>
                                    <li>علاقة المكان (طبيب : مستشفى)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. الخطأ السياقي</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('verbal-4')" data-id="verbal-4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">خطوات الحل</div>
                            <div class="rule-content">
                                <ul>
                                    <li>اقرأ الجملة كاملة</li>
                                    <li>ابحث عن الكلمة الشاذة</li>
                                    <li>جرّب استبدال كل خيار</li>
                                    <li>اختر ما يناسب السياق</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٥. الارتباط والاختلاف</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('verbal-5')" data-id="verbal-5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">طريقة الحل</div>
                            <div class="rule-content">
                                <ul>
                                    <li>اقرأ جميع الكلمات</li>
                                    <li>ابحث عن العامل المشترك</li>
                                    <li>حدد الكلمة المختلفة</li>
                                    <li>تأكد من الإجابة</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getQuantitativeContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">🔢 القسم الكمي</h1>
                <p class="section-description">جميع القوانين والاختصارات للقسم الكمي</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. اختصارات الحساب</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('quant-1')" data-id="quant-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">الضرب في ١١</div>
                            <div class="formula-card">
                                <div class="formula">٢٣ × ١١ = ٢(٢+٣)٣ = ٢٥٣</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">تربيع عدد ينتهي بـ ٥</div>
                            <div class="formula-card">
                                <div class="formula">٢٥² = (٢ × ٣)٢٥ = ٦٢٥</div>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">القاعدة: اضرب الرقم الأول في (نفسه + ١) ثم أضف ٢٥</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الضرب السريع</div>
                            <div class="formula-card">
                                <div class="formula">١٦ × ٢٥ = (١٦ ÷ ٤) × ١٠٠ = ٤٠٠</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. الكسور</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('quant-2')" data-id="quant-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">جمع الكسور</div>
                            <div class="formula-card">
                                <div class="formula">أ/ب + ﺟ/د = (أد + ﺟب)/(ب × د)</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">ضرب الكسور</div>
                            <div class="formula-card">
                                <div class="formula">أ/ب × ﺟ/د = (أ × ﺟ)/(ب × د)</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">قسمة الكسور</div>
                            <div class="formula-card">
                                <div class="formula">أ/ب ÷ ﺟ/د = أ/ب × د/ﺟ</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. قوانين الأسس</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('quant-3')" data-id="quant-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">القوانين الأساسية</div>
                            <div class="formula-card">
                                <div class="formula">أ^م × أ^ن = أ^(م + ن)</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">أ^م ÷ أ^ن = أ^(م − ن)</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">(أ^م)^ن = أ^(م × ن)</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">أ^٠ = ١</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">أ^−م = ١/أ^م</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. النسبة المئوية</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('quant-4')" data-id="quant-4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">اختصارات سريعة</div>
                            <div class="rule-content">
                                <ul>
                                    <li>١٠٪ = القسمة على ١٠</li>
                                    <li>٥٪ = نصف الـ ١٠٪</li>
                                    <li>٢٠٪ = القسمة على ٥</li>
                                    <li>٢٥٪ = القسمة على ٤</li>
                                    <li>٥٠٪ = القسمة على ٢</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getGeometryContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">📐 الهندسة</h1>
                <p class="section-description">قوانين الهندسة مع رسومات SVG توضيحية تفاعلية</p>

                <!-- Angles Section -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. الزوايا</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-0')" data-id="geo-0">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">الزاوية المستقيمة</div>
                            <div class="formula-card">
                                <div class="formula">مجموع الزوايا على خط مستقيم = ١٨٠°</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 320 140" width="100%" style="max-width: 320px;">
                                    <!-- Base line -->
                                    <line x1="20" y1="90" x2="300" y2="90" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Angle lines -->
                                    <line x1="160" y1="90" x2="110" y2="25" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="160" y1="90" x2="230" y2="35" stroke="#d99335" stroke-width="3"/>
                                    <!-- Angle arcs -->
                                    <path d="M 125 90 A 35 35 0 0 1 138 62" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 195 90 A 35 35 0 0 0 208 70" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="115" y="75" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">α</text>
                                    <text x="210" y="78" fill="#d99335" font-family="Arial" font-size="18" font-weight="bold">β</text>
                                    <text x="105" y="125" fill="#2c3e50" font-family="Arial" font-size="15" font-weight="bold">α + β = 180°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزاوية المركزية</div>
                            <div class="formula-card">
                                <div class="formula">مجموع الزوايا حول نقطة = ٣٦٠°</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 280 260" width="100%" style="max-width: 280px;">
                                    <!-- Center point -->
                                    <circle cx="140" cy="130" r="5" fill="#2c3e50"/>
                                    <!-- Angle lines -->
                                    <line x1="140" y1="130" x2="140" y2="30" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="240" y2="85" stroke="#d99335" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="195" y2="215" stroke="#27ae60" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="40" y2="170" stroke="#e74c3c" stroke-width="3"/>
                                    <!-- Angle arcs -->
                                    <path d="M 140 60 A 70 70 0 0 1 190 95" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 200 115 A 70 70 0 0 1 175 190" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="160" y="70" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">α</text>
                                    <text x="205" y="115" fill="#d99335" font-family="Arial" font-size="18" font-weight="bold">β</text>
                                    <text x="165" y="195" fill="#27ae60" font-family="Arial" font-size="18" font-weight="bold">γ</text>
                                    <text x="70" y="160" fill="#e74c3c" font-family="Arial" font-size="18" font-weight="bold">δ</text>
                                    <text x="65" y="245" fill="#2c3e50" font-family="Arial" font-size="14" font-weight="bold">α + β + γ + δ = 360°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزوايا المتقابلة بالرأس</div>
                            <div class="formula-card">
                                <div class="formula">الزوايا المتقابلة بالرأس متساوية</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 280 200" width="100%" style="max-width: 280px;">
                                    <!-- Intersecting lines -->
                                    <line x1="30" y1="40" x2="250" y2="160" stroke="#2c3e50" stroke-width="3"/>
                                    <line x1="30" y1="160" x2="250" y2="40" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Center point -->
                                    <circle cx="140" cy="100" r="4" fill="#e74c3c"/>
                                    <!-- Angle marks -->
                                    <path d="M 165 85 A 25 25 0 0 1 155 70" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 115 115 A 25 25 0 0 1 125 130" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="175" y="75" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">α</text>
                                    <text x="105" y="140" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">α</text>
                                    <text x="90" y="185" fill="#2c3e50" font-family="Arial" font-size="14" font-weight="bold">الزوايا المتقابلة متساوية</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزوايا المتكاملة</div>
                            <div class="formula-card">
                                <div class="formula">زاويتان متكاملتان = ٩٠°</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزوايا المتتامة</div>
                            <div class="formula-card">
                                <div class="formula">زاويتان متتامتان = ١٨٠°</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Triangles Section -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. المثلثات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-1')" data-id="geo-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">زوايا المثلث</div>
                            <div class="formula-card">
                                <div class="formula">مجموع زوايا المثلث = ١٨٠°</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 220" width="100%" style="max-width: 300px;">
                                    <!-- Triangle -->
                                    <polygon points="150,35 55,180 245,180" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Angle arcs -->
                                    <path d="M 150 65 A 30 30 0 0 0 168 50" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 80 175 A 25 25 0 0 1 88 158" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <path d="M 220 175 A 25 25 0 0 0 212 158" fill="none" stroke="#27ae60" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="145" y="60" fill="#f5ab4a" font-family="Arial" font-size="20" font-weight="bold">α</text>
                                    <text x="60" y="165" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">β</text>
                                    <text x="230" y="165" fill="#27ae60" font-family="Arial" font-size="20" font-weight="bold">γ</text>
                                    <text x="95" y="210" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">α + β + γ = 180°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">نظرية فيثاغورس (للمثلث القائم الزاوية)</div>
                            <div class="formula-card">
                                <div class="formula">a² + b² = c²</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 320 240" width="100%" style="max-width: 320px;">
                                    <!-- Right triangle -->
                                    <polygon points="60,190 60,60 220,190" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Right angle marker -->
                                    <rect x="60" y="170" width="20" height="20" fill="none" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Side labels -->
                                    <text x="30" y="130" fill="#f5ab4a" font-family="Arial" font-size="22" font-weight="bold">a</text>
                                    <text x="135" y="215" fill="#d99335" font-family="Arial" font-size="22" font-weight="bold">b</text>
                                    <text x="130" y="110" fill="#e74c3c" font-family="Arial" font-size="20" font-weight="bold">c (hypotenuse)</text>
                                    <text x="80" y="235" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">a² + b² = c²</text>
                                </svg>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;"><strong>المثلثات الشهيرة:</strong> (3,4,5) | (5,12,13) | (8,15,17) | (7,24,25)</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزاوية الخارجية للمثلث</div>
                            <div class="formula-card">
                                <div class="formula">الزاوية الخارجية = مجموع الزاويتين الداخليتين البعيدتين</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">مساحة المثلث</div>
                            <div class="formula-card">
                                <div class="formula">Area = (Base × Height) ÷ 2</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 320 220" width="100%" style="max-width: 320px;">
                                    <!-- Triangle -->
                                    <polygon points="160,35 60,180 260,180" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Height line -->
                                    <line x1="160" y1="35" x2="160" y2="180" stroke="#e74c3c" stroke-width="3" stroke-dasharray="8,4"/>
                                    <!-- Base line -->
                                    <line x1="60" y1="190" x2="260" y2="190" stroke="#d99335" stroke-width="5"/>
                                    <line x1="60" y1="185" x2="60" y2="195" stroke="#d99335" stroke-width="3"/>
                                    <line x1="260" y1="185" x2="260" y2="195" stroke="#d99335" stroke-width="3"/>
                                    <!-- Height markers -->
                                    <line x1="155" y1="35" x2="165" y2="35" stroke="#e74c3c" stroke-width="3"/>
                                    <line x1="155" y1="180" x2="165" y2="180" stroke="#e74c3c" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="170" y="110" fill="#e74c3c" font-family="Arial" font-size="18" font-weight="bold">h</text>
                                    <text x="145" y="210" fill="#d99335" font-family="Arial" font-size="18" font-weight="bold">b</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">محيط المثلث</div>
                            <div class="formula-card">
                                <div class="formula">Perimeter = a + b + c</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المثلث متساوي الساقين (Isosceles Triangle)</div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 220" width="100%" style="max-width: 300px;">
                                    <!-- Triangle -->
                                    <polygon points="150,35 60,185 240,185" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Height -->
                                    <line x1="150" y1="35" x2="150" y2="185" stroke="#e74c3c" stroke-width="2" stroke-dasharray="6,3"/>
                                    <!-- Equal sides marks -->
                                    <line x1="95" y1="100" x2="105" y2="105" stroke="#2c3e50" stroke-width="3"/>
                                    <line x1="195" y1="105" x2="205" y2="100" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Equal angles arcs -->
                                    <path d="M 85 180 A 20 20 0 0 1 92 165" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <path d="M 215 180 A 20 20 0 0 0 208 165" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="85" y="110" fill="#f5ab4a" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                    <text x="195" y="110" fill="#f5ab4a" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                    <text x="68" y="170" fill="#d99335" font-family="Arial" font-size="18" font-weight="bold">β</text>
                                    <text x="222" y="170" fill="#d99335" font-family="Arial" font-size="18" font-weight="bold">β</text>
                                    <text x="140" y="30" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">α</text>
                                </svg>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">• Two equal sides (L = L) • Two equal base angles (β = β)</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المثلث متساوي الأضلاع (Equilateral Triangle)</div>
                            <div class="formula-card">
                                <div class="formula">Area = (L² × √3) ÷ 4</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 240" width="100%" style="max-width: 300px;">
                                    <!-- Triangle -->
                                    <polygon points="150,35 45,195 255,195" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Equal sides marks -->
                                    <line x1="90" y1="105" x2="100" y2="110" stroke="#2c3e50" stroke-width="3"/>
                                    <line x1="200" y1="110" x2="210" y2="105" stroke="#2c3e50" stroke-width="3"/>
                                    <line x1="140" y1="200" x2="150" y2="200" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Angle arcs -->
                                    <path d="M 150 60 A 25 25 0 0 0 168 48" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 70 190 A 25 25 0 0 1 78 173" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 230 190 A 25 25 0 0 0 222 173" fill="none" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="142" y="62" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">60°</text>
                                    <text x="52" y="180" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">60°</text>
                                    <text x="242" y="180" fill="#f5ab4a" font-family="Arial" font-size="18" font-weight="bold">60°</text>
                                    <text x="80" y="125" fill="#2c3e50" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                    <text x="195" y="125" fill="#2c3e50" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                    <text x="142" y="220" fill="#2c3e50" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                </svg>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">• All sides equal (L = L = L) • All angles = 60°</p>
                        </div>
                    </div>
                </div>

                <!-- Circle Section -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. الدائرة</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-2')" data-id="geo-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">مساحة الدائرة (Circle Area)</div>
                            <div class="formula-card">
                                <div class="formula">A = π × r²</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 240" width="100%" style="max-width: 300px;">
                                    <!-- Circle -->
                                    <circle cx="150" cy="120" r="85" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Center -->
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <!-- Radius -->
                                    <line x1="150" y1="120" x2="235" y2="120" stroke="#e74c3c" stroke-width="3"/>
                                    <circle cx="235" cy="120" r="5" fill="#e74c3c"/>
                                    <!-- Radius markers -->
                                    <line x1="235" y1="115" x2="235" y2="125" stroke="#e74c3c" stroke-width="3"/>
                                    <line x1="150" y1="115" x2="150" y2="125" stroke="#e74c3c" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="185" y="110" fill="#e74c3c" font-family="Arial" font-size="20" font-weight="bold">r</text>
                                    <text x="140" y="125" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">O</text>
                                    <text x="95" y="230" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">A = πr²  (π ≈ 3.14)</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">محيط الدائرة (Circumference)</div>
                            <div class="formula-card">
                                <div class="formula">C = 2πr = πd</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 240" width="100%" style="max-width: 300px;">
                                    <!-- Circle -->
                                    <circle cx="150" cy="120" r="85" fill="none" stroke="#f5ab4a" stroke-width="4"/>
                                    <!-- Center -->
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <!-- Diameter -->
                                    <line x1="65" y1="120" x2="235" y2="120" stroke="#d99335" stroke-width="3"/>
                                    <circle cx="65" cy="120" r="5" fill="#d99335"/>
                                    <circle cx="235" cy="120" r="5" fill="#d99335"/>
                                    <!-- Radius -->
                                    <line x1="150" y1="120" x2="150" y2="35" stroke="#e74c3c" stroke-width="3"/>
                                    <circle cx="150" cy="35" r="5" fill="#e74c3c"/>
                                    <!-- Circumference highlight -->
                                    <path d="M 235 120 A 85 85 0 0 1 65 120" fill="none" stroke="#f5ab4a" stroke-width="6"/>
                                    <!-- Labels -->
                                    <text x="140" y="80" fill="#e74c3c" font-family="Arial" font-size="20" font-weight="bold">r</text>
                                    <text x="145" y="135" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">d</text>
                                    <text x="85" y="230" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">C = 2πr = πd</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">القطاع الدائري (Sector)</div>
                            <div class="formula-card">
                                <div class="formula">Sector Area = (θ/360) × πr²</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 240" width="100%" style="max-width: 300px;">
                                    <!-- Full circle (dashed) -->
                                    <circle cx="150" cy="120" r="85" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="6,4"/>
                                    <!-- Sector -->
                                    <path d="M 150 120 L 235 120 A 85 85 0 0 1 185 190 Z" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Center -->
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <!-- Radii -->
                                    <line x1="150" y1="120" x2="235" y2="120" stroke="#e74c3c" stroke-width="3"/>
                                    <line x1="150" y1="120" x2="185" y2="190" stroke="#e74c3c" stroke-width="3"/>
                                    <!-- Angle arc -->
                                    <path d="M 185 120 A 35 35 0 0 1 172 145" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="175" y="135" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">θ</text>
                                    <text x="188" y="110" fill="#e74c3c" font-family="Arial" font-size="18" font-weight="bold">r</text>
                                    <text x="140" y="125" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">O</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">طول القوس (Arc Length)</div>
                            <div class="formula-card">
                                <div class="formula">Arc = (θ/360) × 2πr</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 240" width="100%" style="max-width: 300px;">
                                    <!-- Full circle (dashed) -->
                                    <circle cx="150" cy="120" r="85" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="6,4"/>
                                    <!-- Arc (highlighted) -->
                                    <path d="M 235 120 A 85 85 0 0 1 105 195" fill="none" stroke="#f5ab4a" stroke-width="6"/>
                                    <!-- Center -->
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <!-- Radii (dashed) -->
                                    <line x1="150" y1="120" x2="235" y2="120" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4,3"/>
                                    <line x1="150" y1="120" x2="105" y2="195" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4,3"/>
                                    <!-- Arc endpoints -->
                                    <circle cx="235" cy="120" r="5" fill="#f5ab4a"/>
                                    <circle cx="105" cy="195" r="5" fill="#f5ab4a"/>
                                    <!-- Angle arc -->
                                    <path d="M 185 120 A 35 35 0 0 1 165 150" fill="none" stroke="#d99335" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="175" y="145" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">θ</text>
                                    <text x="170" y="155" fill="#f5ab4a" font-family="Arial" font-size="16" font-weight="bold">arc</text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Square and Rectangle Section -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. المربع والمستطيل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-3')" data-id="geo-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المربع (Square)</div>
                            <div class="formula-card">
                                <div class="formula">Area = s²  |  Perimeter = 4s</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 300 260" width="100%" style="max-width: 300px;">
                                    <!-- Square -->
                                    <rect x="70" y="55" width="160" height="160" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Diagonal -->
                                    <line x1="70" y1="55" x2="230" y2="215" stroke="#e74c3c" stroke-width="2" stroke-dasharray="6,4"/>
                                    <!-- Right angle marker -->
                                    <rect x="70" y="55" width="18" height="18" fill="none" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Side dimension lines -->
                                    <line x1="70" y1="45" x2="230" y2="45" stroke="#d99335" stroke-width="2"/>
                                    <line x1="70" y1="40" x2="70" y2="50" stroke="#d99335" stroke-width="2"/>
                                    <line x1="230" y1="40" x2="230" y2="50" stroke="#d99335" stroke-width="2"/>
                                    <!-- Labels -->
                                    <text x="142" y="38" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">s</text>
                                    <text x="242" y="140" fill="#f5ab4a" font-family="Arial" font-size="20" font-weight="bold">s</text>
                                    <text x="138" y="125" fill="#e74c3c" font-family="Arial" font-size="16" font-weight="bold">d = s√2</text>
                                    <text x="75" y="250" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">A = s²,  P = 4s</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المستطيل (Rectangle)</div>
                            <div class="formula-card">
                                <div class="formula">Area = L × W  |  Perimeter = 2(L + W)</div>
                            </div>
                            <div class="svg-container">
                                <svg viewBox="0 0 340 240" width="100%" style="max-width: 340px;">
                                    <!-- Rectangle -->
                                    <rect x="50" y="75" width="240" height="120" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <!-- Right angle marker -->
                                    <rect x="50" y="75" width="18" height="18" fill="none" stroke="#2c3e50" stroke-width="3"/>
                                    <!-- Length dimension -->
                                    <line x1="50" y1="60" x2="290" y2="60" stroke="#d99335" stroke-width="3"/>
                                    <line x1="50" y1="55" x2="50" y2="65" stroke="#d99335" stroke-width="3"/>
                                    <line x1="290" y1="55" x2="290" y2="65" stroke="#d99335" stroke-width="3"/>
                                    <!-- Width dimension -->
                                    <line x1="305" y1="75" x2="305" y2="195" stroke="#e74c3c" stroke-width="3"/>
                                    <line x1="300" y1="75" x2="310" y2="75" stroke="#e74c3c" stroke-width="3"/>
                                    <line x1="300" y1="195" x2="310" y2="195" stroke="#e74c3c" stroke-width="3"/>
                                    <!-- Labels -->
                                    <text x="155" y="50" fill="#d99335" font-family="Arial" font-size="20" font-weight="bold">L</text>
                                    <text x="318" y="140" fill="#e74c3c" font-family="Arial" font-size="20" font-weight="bold">W</text>
                                    <text x="85" y="225" fill="#2c3e50" font-family="Arial" font-size="16" font-weight="bold">A = L×W,  P = 2(L+W)</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">متوازي الأضلاع (Parallelogram)</div>
                            <div class="formula-card">
                                <div class="formula">Area = Base × Height</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">شبه المنحرف (Trapezoid)</div>
                            <div class="formula-card">
                                <div class="formula">Area = [(a + b) ÷ 2] × h</div>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">a, b = القاعدتان المتوازيتان، h = الارتفاع</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getAlgebraContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">🧮 الجبر والإحصاء</h1>
                <p class="section-description">المتطابقات والاحتمالات والإحصاء</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. المتطابقات الشهيرة</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('alg-1')" data-id="alg-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card">
                            <div class="formula">(أ + ب)² = أ² + ٢أب + ب²</div>
                        </div>
                        <div class="formula-card">
                            <div class="formula">(أ − ب)² = أ² − ٢أب + ب²</div>
                        </div>
                        <div class="formula-card">
                            <div class="formula">(أ + ب)(أ − ب) = أ² − ب²</div>
                        </div>
                        <div class="formula-card">
                            <div class="formula">(أ + ب)³ = أ³ + ٣أ²ب + ٣أب² + ب³</div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. الإحصاء</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('alg-2')" data-id="alg-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المتوسط الحسابي</div>
                            <div class="formula-card">
                                <div class="formula">المتوسط = مجموع القيم ÷ عددها</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الوسيط</div>
                            <div class="rule-content">
                                <p>القيمة الوسطى بعد ترتيب البيانات تصاعدياً</p>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المنوال</div>
                            <div class="rule-content">
                                <p>القيمة الأكثر تكراراً</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. الاحتمالات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('alg-3')" data-id="alg-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">الاحتمال</div>
                            <div class="formula-card">
                                <div class="formula">الاحتمال = عدد الحالات المرغوبة ÷ عدد الحالات الممكنة</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">خصائص الاحتمال</div>
                            <div class="rule-content">
                                <ul>
                                    <li>الاحتمال دائماً بين ٠ و ١</li>
                                    <li>احتمال الحدث المؤكد = ١</li>
                                    <li>احتمال الحدث المستحيل = ٠</li>
                                    <li>مجموع احتمالات الحدث ونقيضه = ١</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getStrategiesContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">⚡ استراتيجيات النجاح</h1>
                <p class="section-description">نصائح وإرشادات للتفوق في الاختبار</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>⏱️ إدارة الوقت</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-1')" data-id="str-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>٢٤ سؤال في ٢٥ دقيقة</li>
                                <li>متوسط: دقيقة لكل سؤال</li>
                                <li>السهل: ٣٠ ثانية</li>
                                <li>المتوسط: دقيقة</li>
                                <li>الصعب: دقيقة ونصف</li>
                                <li>احتفظ بـ ٣ دقائق للمراجعة</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>📊 ترتيب الحل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-2')" data-id="str-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>اقرأ جميع الأسئلة أولاً</li>
                                <li>ابدأ بالأسهل</li>
                                <li>ثم المتوسط</li>
                                <li>أخيراً الصعب</li>
                                <li>راجع الإجابات</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>❌ تقنية الاستبعاد</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-3')" data-id="str-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>احذف المستحيل</li>
                                <li>احذف المتناقض</li>
                                <li>احذف المتشابه جداً</li>
                                <li>اختر من الباقي</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>🎯 إرشادات أساسية</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-4')" data-id="str-4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>احرص على الإجابة على جميع الأسئلة (لا توجد درجات سالبة)</li>
                                <li>إذا استغرق السؤال أكثر من دقيقتين، قدّر الإجابة وانتقل</li>
                                <li>اعتمد على إجابتك الأولى (لا تغيّر إلا بعد التأكد)</li>
                                <li>استخدم الطرق المختصرة بدلاً من الحلول المطوّلة</li>
                                <li>تحقّق من الوحدات المستخدمة</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>🌙 ليلة الاختبار</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-5')" data-id="str-5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>احصل على قسط كافٍ من النوم (٨ ساعات)</li>
                                <li>تجنّب دراسة محتوى جديد</li>
                                <li>راجع الطرق والقوانين الأساسية</li>
                                <li>جهّز الأوراق والوثائق المطلوبة</li>
                                <li>ارتدِ ملابس مريحة</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>☀️ يوم الاختبار</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('str-6')" data-id="str-6">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content">
                            <ul>
                                <li>تناول وجبة إفطار صحية</li>
                                <li>تناول كمية كافية من الماء</li>
                                <li>توجّه إلى مقر الاختبار مبكراً</li>
                                <li>تنفّس بعمق واسترخِ</li>
                                <li>ابدأ بالبسملة والدعاء</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getBookmarksContent() {
        const bookmarks = Bookmarks.getAll();

        if (bookmarks.length === 0) {
            return `
                <div class="content-section">
                    <h1 class="section-title">⭐ المفضلة</h1>
                    <p class="section-description">لم تقم بحفظ أي عناصر بعد</p>

                    <div class="rule-box">
                        <div class="rule-title">💡 كيفية الاستخدام</div>
                        <div class="rule-content">
                            <p>اضغط على أيقونة النجمة ☆ بجانب أي قانون أو اختصار لحفظه في المفضلة للمراجعة السريعة</p>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="content-section">
                <h1 class="section-title">⭐ المفضلة</h1>
                <p class="section-description">القوانين والاختصارات المحفوظة (${bookmarks.length})</p>

                <div class="rule-box">
                    <div class="rule-content">
                        <p>لديك ${bookmarks.length} عنصر محفوظ</p>
                        <button class="icon-btn" style="margin-top: 1rem;" onclick="Bookmarks.clearAll()">مسح الكل</button>
                    </div>
                </div>
            </div>
        `;
    },

    getMoreContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">☰ المزيد</h1>
                <p class="section-description">خيارات إضافية</p>

                <div class="cards-grid">
                    <div class="card" onclick="Navigation.goTo('algebra')">
                        <div class="card-header">
                            <span>🧮 الجبر والإحصاء</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>المتطابقات، الاحتمالات، الإحصاء</p>
                        </div>
                    </div>

                    <div class="card" onclick="Navigation.goTo('strategies')">
                        <div class="card-header">
                            <span>⚡ استراتيجيات النجاح</span>
                            <span class="card-icon">←</span>
                        </div>
                        <div class="card-body">
                            <p>نصائح وإرشادات للتفوق</p>
                        </div>
                    </div>

                    <div class="card" onclick="App.toggleDarkMode()">
                        <div class="card-header">
                            <span id="darkModeText">🌙 الوضع الليلي</span>
                            <span class="card-icon">⚙️</span>
                        </div>
                        <div class="card-body">
                            <p>تفعيل/إلغاء الوضع الليلي</p>
                        </div>
                    </div>

                    <div class="card" onclick="App.installApp()">
                        <div class="card-header">
                            <span>📱 تثبيت التطبيق</span>
                            <span class="card-icon">↓</span>
                        </div>
                        <div class="card-body">
                            <p>ثبّت التطبيق على جهازك للوصول السريع</p>
                        </div>
                    </div>
                </div>

                <div class="rule-box">
                    <div class="rule-title">ℹ️ حول التطبيق</div>
                    <div class="rule-content">
                        <p><strong>الإصدار:</strong> 1.0.0</p>
                        <p><strong>إعداد:</strong> يمناك</p>
                        <p style="margin-top: 1rem;">تطبيق ويب تقدمي (PWA) يعمل بدون إنترنت</p>
                    </div>
                </div>
            </div>
        `;
    },

    setupSectionInteractions() {
        // Setup bookmark buttons
        Bookmarks.updateAllButtons();
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    },

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    },

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        const darkModeStyle = document.getElementById('dark-mode-style');
        const darkModeBtn = document.getElementById('darkModeBtn');

        if (this.darkMode) {
            darkModeStyle.removeAttribute('disabled');
            darkModeBtn.textContent = '☀️';
            localStorage.setItem('darkMode', 'true');
            this.showToast('تم تفعيل الوضع الليلي');
        } else {
            darkModeStyle.setAttribute('disabled', 'true');
            darkModeBtn.textContent = '🌙';
            localStorage.setItem('darkMode', 'false');
            this.showToast('تم إلغاء الوضع الليلي');
        }
    },

    loadDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            this.darkMode = true;
            document.getElementById('dark-mode-style').removeAttribute('disabled');
            document.getElementById('darkModeBtn').textContent = '☀️';
        }
    },

    showToast(message, duration = 2000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    installPrompt: null,

    checkInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
        });
    },

    installApp() {
        if (this.installPrompt) {
            this.installPrompt.prompt();
            this.installPrompt.userChoice.then((result) => {
                if (result.outcome === 'accepted') {
                    this.showToast('جاري تثبيت التطبيق...');
                }
                this.installPrompt = null;
            });
        } else {
            this.showToast('التطبيق مثبت مسبقاً أو غير مدعوم');
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
