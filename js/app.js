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
                <p class="section-description">قوانين الهندسة مع رسومات توضيحية تفاعلية</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. المثلثات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-1')" data-id="geo-1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">زوايا المثلث</div>
                            <div class="formula-card">
                                <div class="formula">مجموع زوايا المثلث = ١٨٠°</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">نظرية فيثاغورس</div>
                            <div class="formula-card">
                                <div class="formula">أ² + ب² = ﺟ²</div>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">حيث ﺟ = الوتر (أطول ضلع)</p>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">المثلثات الشهيرة: (٣،٤،٥) | (٥،١٢،١٣) | (٨،١٥،١٧)</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">مساحة المثلث</div>
                            <div class="formula-card">
                                <div class="formula">المساحة = (القاعدة × الارتفاع) ÷ ٢</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. الدائرة</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-2')" data-id="geo-2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">مساحة الدائرة</div>
                            <div class="formula-card">
                                <div class="formula">المساحة = ط × نق²</div>
                            </div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">حيث ط ≈ ٣٫١٤ أو ٢٢/٧</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">محيط الدائرة</div>
                            <div class="formula-card">
                                <div class="formula">المحيط = ٢ × ط × نق</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">المحيط = ط × القطر</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. المربع والمستطيل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('geo-3')" data-id="geo-3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المربع</div>
                            <div class="formula-card">
                                <div class="formula">المساحة = الضلع²</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">المحيط = ٤ × الضلع</div>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المستطيل</div>
                            <div class="formula-card">
                                <div class="formula">المساحة = الطول × العرض</div>
                            </div>
                            <div class="formula-card">
                                <div class="formula">المحيط = ٢ × (الطول + العرض)</div>
                            </div>
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
