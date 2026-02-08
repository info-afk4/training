// ==================== تهيئة التطبيق ====================

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
        document.getElementById('darkModeBtn').addEventListener('click', () => this.toggleDarkMode());
        document.getElementById('menuBtn').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('overlay').addEventListener('click', () => this.closeSidebar());
        document.getElementById('searchBtn').addEventListener('click', () => Search.toggle());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { this.closeSidebar(); Search.close(); SvgEditor.close(); }
        });
        window.addEventListener('resize', () => { if (window.innerWidth > 1024) this.closeSidebar(); });
    },

    loadSection(sectionName) {
        this.currentSection = sectionName;
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = '<div class="loading"><div class="spinner"></div><p>جاري التحميل...</p></div>';
        setTimeout(() => {
            mainContent.innerHTML = this.getSectionContent(sectionName);
            this.setupSectionInteractions();
            this.closeSidebar();
            window.scrollTo(0, 0);
        }, 200);
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

    // ==================== محتوى الصفحة الرئيسية ====================
    getHomeContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">مرحباً بك في دليل القدرات</h1>
                <p class="section-description">دليلك الشامل للتفوق في اختبار القدرات العامة (قياس)</p>
                <div class="cards-grid">
                    <div class="card" onclick="Navigation.goTo('verbal')">
                        <div class="card-header"><span>📖 القسم اللفظي</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>استيعاب المقروء، إكمال الجمل، التناظر اللفظي، الخطأ السياقي، الارتباط والاختلاف</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('quantitative')">
                        <div class="card-header"><span>🔢 القسم الكمي</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>الحساب، الكسور، المعادلات، الأسس، الجذور، النسب، المتتاليات، التباديل والتوافيق</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('geometry')">
                        <div class="card-header"><span>📐 الهندسة</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>الزوايا، المثلثات، الدوائر، الأشكال الرباعية، الأشكال ثلاثية الأبعاد، هندسة الإحداثيات</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('algebra')">
                        <div class="card-header"><span>🧮 الجبر والإحصاء</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>المتطابقات، التحليل، الاحتمالات، الإحصاء، اللوغاريتمات</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('strategies')">
                        <div class="card-header"><span>⚡ استراتيجيات النجاح</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>إدارة الوقت، تقنية الاستبعاد، إرشادات أساسية للتميّز</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('bookmarks')">
                        <div class="card-header"><span>⭐ المفضلة</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>القوانين والاختصارات المحفوظة للمراجعة السريعة</p></div>
                    </div>
                </div>
            </div>`;
    },

    // ==================== القسم اللفظي ====================
    getVerbalContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">📖 القسم اللفظي</h1>
                <p class="section-description">جميع الطرق والاختصارات للقسم اللفظي (٥٠٪ علمي / ٧٠٪ أدبي)</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. اختصار احصد - استيعاب المقروء</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('v1')" data-id="v1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">احصد: الطريقة المختصرة لحل القطع</div>
                            <div class="rule-content"><ul>
                                <li><strong>ا - اقرأ السؤال:</strong> ابدأ بقراءة السؤال قبل القطعة</li>
                                <li><strong>ح - حدد نوع السؤال:</strong> (ضمير، معنى، علاقة، معلومة، فكرة، فهم)</li>
                                <li><strong>ص - صوّب على الإجابة:</strong> اقرأ الجزء المطلوب فقط من القطعة</li>
                                <li><strong>د - دقق في الخيارات:</strong> استبعد الخيارات الخاطئة واختر الأدق</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. إكمال الجمل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('v2')" data-id="v2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">كلهم إلا: طريقة الاستبعاد السريع</div>
                            <div class="rule-content"><ul>
                                <li><strong>ك - كرر قراءة الجملة:</strong> افهم السياق العام</li>
                                <li><strong>ل - لاحظ الروابط:</strong> (لكن، إلا، رغم، مع أن، بالرغم)</li>
                                <li><strong>ه - هات الكلمة المناسبة:</strong> قبل قراءة الخيارات</li>
                                <li><strong>م - مرر على الخيارات:</strong> اختر الأقرب لتوقعك</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. التناظر اللفظي</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('v3')" data-id="v3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">أنواع العلاقات في التناظر</div>
                            <div class="rule-content"><ul>
                                <li>علاقة الجزء بالكل (يد : جسم)</li>
                                <li>علاقة الترادف (بيت : منزل)</li>
                                <li>علاقة التضاد (حار : بارد)</li>
                                <li>علاقة السبب والنتيجة (مطر : فيضان)</li>
                                <li>علاقة الوظيفة (قلم : كتابة)</li>
                                <li>علاقة المكان (طبيب : مستشفى)</li>
                                <li>علاقة الاحتواء (كتاب : صفحة)</li>
                                <li>علاقة الصفة (عسل : حلاوة)</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. الخطأ السياقي</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('v4')" data-id="v4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-content"><ul>
                                <li>اقرأ الجملة كاملة وافهم المعنى العام</li>
                                <li>ابحث عن الكلمة التي لا تتناسب مع السياق</li>
                                <li>عادةً تكون كلمة مضادة للمعنى المراد</li>
                                <li>جرّب استبدال كل خيار وتأكد من صحة المعنى</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٥. الارتباط والاختلاف</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('v5')" data-id="v5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-content"><ul>
                                <li>اقرأ جميع الكلمات أو العبارات</li>
                                <li>ابحث عن العامل المشترك بين ٣ كلمات</li>
                                <li>حدد الكلمة المختلفة التي لا تنتمي للمجموعة</li>
                                <li>تأكد أن المختلفة لا تشترك مع الباقي بأي صفة</li>
                            </ul></div>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    // ==================== القسم الكمي ====================
    getQuantitativeContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">🔢 القسم الكمي</h1>
                <p class="section-description">جميع القوانين والاختصارات للقسم الكمي</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. اختصارات الحساب</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q1')" data-id="q1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">الضرب في ١١</div>
                            <div class="formula-card"><div class="formula">٢٣ × ١١ = ٢(٢+٣)٣ = ٢٥٣</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">تربيع عدد ينتهي بـ ٥</div>
                            <div class="formula-card"><div class="formula">٢٥² = (٢ × ٣)٢٥ = ٦٢٥</div></div>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">القاعدة: اضرب الرقم الأول في (نفسه + ١) ثم أضف ٢٥</p>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الضرب السريع في ٢٥</div>
                            <div class="formula-card"><div class="formula">١٦ × ٢٥ = (١٦ ÷ ٤) × ١٠٠ = ٤٠٠</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الضرب في ٥</div>
                            <div class="formula-card"><div class="formula">أ × ٥ = (أ × ١٠) ÷ ٢</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. الكسور</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q2')" data-id="q2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">أ/ب + ﺟ/د = (أد + ﺟب) / (ب × د)</div></div>
                        <div class="formula-card"><div class="formula">أ/ب × ﺟ/د = (أ × ﺟ) / (ب × د)</div></div>
                        <div class="formula-card"><div class="formula">أ/ب ÷ ﺟ/د = أ/ب × د/ﺟ</div></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. قوانين الأسس</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q3')" data-id="q3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">أ^م × أ^ن = أ^(م + ن)</div></div>
                        <div class="formula-card"><div class="formula">أ^م ÷ أ^ن = أ^(م − ن)</div></div>
                        <div class="formula-card"><div class="formula">(أ^م)^ن = أ^(م × ن)</div></div>
                        <div class="formula-card"><div class="formula">(أ × ب)^ن = أ^ن × ب^ن</div></div>
                        <div class="formula-card"><div class="formula">أ^٠ = ١</div></div>
                        <div class="formula-card"><div class="formula">أ^(−ن) = ١ / أ^ن</div></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. الجذور</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q4')" data-id="q4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">√(أ × ب) = √أ × √ب</div></div>
                        <div class="formula-card"><div class="formula">√(أ / ب) = √أ / √ب</div></div>
                        <div class="formula-card"><div class="formula">أ^(١/ن) = ⁿ√أ</div></div>
                        <div class="formula-card"><div class="formula">√أ² = |أ|</div></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٥. النسبة المئوية</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q5')" data-id="q5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">النسبة المئوية = (الجزء ÷ الكل) × ١٠٠</div></div>
                        <div class="rule-box">
                            <div class="rule-title">اختصارات سريعة</div>
                            <div class="rule-content"><ul>
                                <li>١٠٪ = القسمة على ١٠</li>
                                <li>٢٠٪ = القسمة على ٥</li>
                                <li>٢٥٪ = القسمة على ٤</li>
                                <li>٣٣٫٣٪ = القسمة على ٣</li>
                                <li>٥٠٪ = القسمة على ٢</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٦. المعادلات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q6')" data-id="q6">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المعادلة الخطية</div>
                            <div class="formula-card"><div class="formula">أ س + ب = ٠  ←  س = −ب / أ</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المعادلة التربيعية</div>
                            <div class="formula-card"><div class="formula">أ س² + ب س + ﺟ = ٠</div></div>
                            <div class="formula-card"><div class="formula">س = (−ب ± √(ب² − ٤أﺟ)) / ٢أ</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٧. المتتاليات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q7')" data-id="q7">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المتتالية الحسابية</div>
                            <div class="formula-card"><div class="formula">الحد النوني = أ + (ن − ١) × د</div></div>
                            <div class="formula-card"><div class="formula">المجموع = ن/٢ × (أ + ل)</div></div>
                            <p style="font-size: 0.9rem;">أ = الحد الأول، د = أساس المتتالية، ل = الحد الأخير</p>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المتتالية الهندسية</div>
                            <div class="formula-card"><div class="formula">الحد النوني = أ × ر^(ن − ١)</div></div>
                            <div class="formula-card"><div class="formula">المجموع = أ × (١ − ر^ن) / (١ − ر)</div></div>
                            <p style="font-size: 0.9rem;">أ = الحد الأول، ر = النسبة المشتركة</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٨. المسافة والسرعة والزمن</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q8')" data-id="q8">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">المسافة = السرعة × الزمن</div></div>
                        <div class="formula-card"><div class="formula">السرعة = المسافة ÷ الزمن</div></div>
                        <div class="formula-card"><div class="formula">الزمن = المسافة ÷ السرعة</div></div>
                        <div class="rule-box">
                            <div class="rule-title">السرعة المتوسطة</div>
                            <div class="formula-card"><div class="formula">السرعة المتوسطة = المسافة الكلية ÷ الزمن الكلي</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٩. التناسب</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q9')" data-id="q9">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">التناسب الطردي</div>
                            <div class="formula-card"><div class="formula">إذا زاد أ ← زاد ب  →  ب = ك × أ</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">التناسب العكسي</div>
                            <div class="formula-card"><div class="formula">إذا زاد أ ← نقص ب  →  أ × ب = ثابت</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١٠. التباديل والتوافيق</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('q10')" data-id="q10">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">التباديل (الترتيب مهم)</div>
                            <div class="formula-card"><div class="formula">ت(ن، ر) = ن! / (ن − ر)!</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">التوافيق (الترتيب غير مهم)</div>
                            <div class="formula-card"><div class="formula">ق(ن، ر) = ن! / (ر! × (ن − ر)!)</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المضروب</div>
                            <div class="formula-card"><div class="formula">ن! = ن × (ن−١) × (ن−٢) × ... × ٢ × ١</div></div>
                            <div class="formula-card"><div class="formula">٠! = ١</div></div>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    // ==================== الهندسة ====================
    getGeometryContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">📐 الهندسة</h1>
                <p class="section-description">قوانين الهندسة مع رسومات توضيحية (اضغط ✏️ لتعديل الرسم)</p>

                <!-- الزوايا -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. الزوايا</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g1')" data-id="g1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">الزاوية المستقيمة</div>
                            <div class="formula-card"><div class="formula">مجموع الزوايا على خط مستقيم = ١٨٠°</div></div>
                            <div class="svg-container" data-svg-id="angle-straight">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('angle-straight')">✏️</button>
                                <svg viewBox="0 0 320 140" width="100%" style="max-width:320px;">
                                    <line x1="20" y1="90" x2="300" y2="90" stroke="#2c3e50" stroke-width="3"/>
                                    <line x1="160" y1="90" x2="110" y2="25" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="160" y1="90" x2="230" y2="30" stroke="#d99335" stroke-width="3"/>
                                    <path d="M 128 90 A 32 32 0 0 1 141 65" fill="none" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <path d="M 184 69 A 32 32 0 0 1 192 90" fill="none" stroke="#d99335" stroke-width="2.5"/>
                                    <text x="115" y="72" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="16" font-weight="bold">أ°</text>
                                    <text x="198" y="72" fill="#d99335" font-family="Tajawal,Arial" font-size="16" font-weight="bold">ب°</text>
                                    <text x="105" y="128" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">أ + ب = ١٨٠°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزوايا حول نقطة</div>
                            <div class="formula-card"><div class="formula">مجموع الزوايا حول نقطة = ٣٦٠°</div></div>
                            <div class="svg-container" data-svg-id="angle-point">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('angle-point')">✏️</button>
                                <svg viewBox="0 0 280 260" width="100%" style="max-width:280px;">
                                    <circle cx="140" cy="130" r="5" fill="#2c3e50"/>
                                    <line x1="140" y1="130" x2="140" y2="30" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="240" y2="85" stroke="#d99335" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="195" y2="215" stroke="#27ae60" stroke-width="3"/>
                                    <line x1="140" y1="130" x2="40" y2="170" stroke="#e74c3c" stroke-width="3"/>
                                    <path d="M 140 80 A 50 50 0 0 1 186 101" fill="none" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <path d="M 186 101 A 50 50 0 0 1 170 174" fill="none" stroke="#d99335" stroke-width="2.5"/>
                                    <path d="M 170 174 A 50 50 0 0 1 96 157" fill="none" stroke="#27ae60" stroke-width="2.5"/>
                                    <path d="M 96 157 A 50 50 0 0 1 140 80" fill="none" stroke="#e74c3c" stroke-width="2.5"/>
                                    <text x="162" y="78" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="14" font-weight="bold">أ°</text>
                                    <text x="192" y="140" fill="#d99335" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ب°</text>
                                    <text x="115" y="190" fill="#27ae60" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ﺟ°</text>
                                    <text x="72" y="110" fill="#e74c3c" font-family="Tajawal,Arial" font-size="14" font-weight="bold">د°</text>
                                    <text x="55" y="248" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">أ + ب + ﺟ + د = ٣٦٠°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزوايا المتقابلة بالرأس</div>
                            <div class="formula-card"><div class="formula">الزوايا المتقابلة بالرأس متساوية</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الزوايا المتكاملة والمتتامة</div>
                            <div class="formula-card"><div class="formula">زاويتان متتامتان: مجموعهما = ٩٠°</div></div>
                            <div class="formula-card"><div class="formula">زاويتان متكاملتان: مجموعهما = ١٨٠°</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الزوايا والمستقيمات المتوازية</div>
                            <div class="rule-content"><ul>
                                <li>الزوايا المتبادلة (الداخلية) متساوية</li>
                                <li>الزوايا المتناظرة متساوية</li>
                                <li>الزوايا المتحالفة (الداخلية من نفس الجهة) مجموعهما = ١٨٠°</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <!-- المثلثات -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. المثلثات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g2')" data-id="g2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">زوايا المثلث</div>
                            <div class="formula-card"><div class="formula">مجموع زوايا المثلث = ١٨٠°</div></div>
                            <div class="svg-container" data-svg-id="triangle-angles">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('triangle-angles')">✏️</button>
                                <svg viewBox="0 0 300 220" width="100%" style="max-width:300px;">
                                    <polygon points="150,35 55,180 245,180" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <path d="M 139 60 A 28 28 0 0 1 161 60" fill="none" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <path d="M 78 176 A 25 25 0 0 1 65 162" fill="none" stroke="#d99335" stroke-width="2.5"/>
                                    <path d="M 222 176 A 25 25 0 0 0 235 162" fill="none" stroke="#27ae60" stroke-width="2.5"/>
                                    <text x="143" y="78" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="14" font-weight="bold">أ°</text>
                                    <text x="62" y="172" fill="#d99335" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ب°</text>
                                    <text x="222" y="172" fill="#27ae60" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ﺟ°</text>
                                    <text x="90" y="210" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">أ + ب + ﺟ = ١٨٠°</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">نظرية فيثاغورس (المثلث القائم)</div>
                            <div class="formula-card"><div class="formula">أ² + ب² = ﺟ²   (ﺟ = الوتر)</div></div>
                            <div class="svg-container" data-svg-id="pythagorean">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('pythagorean')">✏️</button>
                                <svg viewBox="0 0 320 240" width="100%" style="max-width:320px;">
                                    <polygon points="60,190 60,60 230,190" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <rect x="60" y="170" width="20" height="20" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <text x="30" y="130" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="20" font-weight="bold">أ</text>
                                    <text x="138" y="215" fill="#d99335" font-family="Tajawal,Arial" font-size="20" font-weight="bold">ب</text>
                                    <text x="135" y="112" fill="#e74c3c" font-family="Tajawal,Arial" font-size="18" font-weight="bold">ﺟ (الوتر)</text>
                                    <text x="80" y="235" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">أ² + ب² = ﺟ²</text>
                                </svg>
                            </div>
                            <p style="font-size:0.9rem;margin-top:0.5rem;">المثلثات الشهيرة: (٣، ٤، ٥) | (٥، ١٢، ١٣) | (٨، ١٥، ١٧) | (٧، ٢٤، ٢٥)</p>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">مساحة ومحيط المثلث</div>
                            <div class="formula-card"><div class="formula">المساحة = (القاعدة × الارتفاع) ÷ ٢</div></div>
                            <div class="formula-card"><div class="formula">المحيط = أ + ب + ﺟ</div></div>
                            <div class="svg-container" data-svg-id="triangle-area">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('triangle-area')">✏️</button>
                                <svg viewBox="0 0 320 220" width="100%" style="max-width:320px;">
                                    <polygon points="160,35 60,180 260,180" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="160" y1="35" x2="160" y2="180" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="8,4"/>
                                    <rect x="152" y="164" width="16" height="16" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <line x1="60" y1="190" x2="260" y2="190" stroke="#d99335" stroke-width="4"/>
                                    <line x1="60" y1="185" x2="60" y2="195" stroke="#d99335" stroke-width="3"/>
                                    <line x1="260" y1="185" x2="260" y2="195" stroke="#d99335" stroke-width="3"/>
                                    <text x="170" y="115" fill="#e74c3c" font-family="Tajawal,Arial" font-size="16" font-weight="bold">ع</text>
                                    <text x="145" y="210" fill="#d99335" font-family="Tajawal,Arial" font-size="16" font-weight="bold">ق</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المثلثات الخاصة</div>
                            <div class="formula-card"><div class="formula">مثلث ٣٠° - ٦٠° - ٩٠°  →  الأضلاع بنسبة  ١ : √٣ : ٢</div></div>
                            <div class="formula-card"><div class="formula">مثلث ٤٥° - ٤٥° - ٩٠°  →  الأضلاع بنسبة  ١ : ١ : √٢</div></div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزاوية الخارجية</div>
                            <div class="formula-card"><div class="formula">الزاوية الخارجية = مجموع الزاويتين الداخليتين البعيدتين</div></div>
                            <div class="svg-container" data-svg-id="exterior-angle">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('exterior-angle')">✏️</button>
                                <svg viewBox="0 0 340 220" width="100%" style="max-width:340px;">
                                    <polygon points="80,170 170,40 260,170" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="260" y1="170" x2="330" y2="170" stroke="#e74c3c" stroke-width="3"/>
                                    <path d="M 241 170 A 20 20 0 0 0 252 155" fill="none" stroke="#27ae60" stroke-width="2.5"/>
                                    <path d="M 278 170 A 18 18 0 0 1 268 155" fill="none" stroke="#e74c3c" stroke-width="2.5"/>
                                    <text x="225" y="162" fill="#27ae60" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ﺟ°</text>
                                    <text x="280" y="162" fill="#e74c3c" font-family="Tajawal,Arial" font-size="13" font-weight="bold">هـ°</text>
                                    <text x="100" y="168" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="13" font-weight="bold">أ°</text>
                                    <text x="165" y="65" fill="#d99335" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ب°</text>
                                    <text x="72" y="210" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">هـ = أ + ب</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المثلث متساوي الأضلاع</div>
                            <div class="formula-card"><div class="formula">جميع الأضلاع متساوية، جميع الزوايا = ٦٠°</div></div>
                            <div class="formula-card"><div class="formula">المساحة = (ل² × √٣) ÷ ٤</div></div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">متباينة المثلث</div>
                            <div class="formula-card"><div class="formula">مجموع أي ضلعين > الضلع الثالث</div></div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المثلث متساوي الساقين</div>
                            <div class="formula-card"><div class="formula">زاويتا القاعدة متساويتان</div></div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">التشابه والتطابق</div>
                            <div class="rule-content"><ul>
                                <li>مثلثان متشابهان: الزوايا المتناظرة متساوية والأضلاع متناسبة</li>
                                <li>نسبة المساحتين = مربع نسبة التشابه</li>
                                <li>نسبة الحجمين = مكعب نسبة التشابه</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <!-- الدائرة -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. الدائرة</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g3')" data-id="g3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">مساحة الدائرة</div>
                            <div class="formula-card"><div class="formula">المساحة = ط × نق²</div></div>
                            <div class="svg-container" data-svg-id="circle-area">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('circle-area')">✏️</button>
                                <svg viewBox="0 0 300 240" width="100%" style="max-width:300px;">
                                    <circle cx="150" cy="120" r="85" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <line x1="150" y1="120" x2="235" y2="120" stroke="#e74c3c" stroke-width="3"/>
                                    <circle cx="235" cy="120" r="5" fill="#e74c3c"/>
                                    <text x="185" y="112" fill="#e74c3c" font-family="Tajawal,Arial" font-size="18" font-weight="bold">نق</text>
                                    <text x="138" y="125" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">م</text>
                                    <text x="85" y="230" fill="#2c3e50" font-family="Tajawal,Arial" font-size="15" font-weight="bold">م = ط × نق²   (ط ≈ ٣٫١٤)</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">محيط الدائرة</div>
                            <div class="formula-card"><div class="formula">المحيط = ٢ × ط × نق = ط × ق</div></div>
                            <div class="svg-container" data-svg-id="circle-circ">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('circle-circ')">✏️</button>
                                <svg viewBox="0 0 300 240" width="100%" style="max-width:300px;">
                                    <circle cx="150" cy="120" r="85" fill="none" stroke="#f5ab4a" stroke-width="4"/>
                                    <circle cx="150" cy="120" r="5" fill="#2c3e50"/>
                                    <line x1="65" y1="120" x2="235" y2="120" stroke="#d99335" stroke-width="3"/>
                                    <circle cx="65" cy="120" r="5" fill="#d99335"/>
                                    <circle cx="235" cy="120" r="5" fill="#d99335"/>
                                    <line x1="150" y1="120" x2="150" y2="35" stroke="#e74c3c" stroke-width="3"/>
                                    <circle cx="150" cy="35" r="5" fill="#e74c3c"/>
                                    <text x="142" y="82" fill="#e74c3c" font-family="Tajawal,Arial" font-size="16" font-weight="bold">نق</text>
                                    <text x="142" y="138" fill="#d99335" font-family="Tajawal,Arial" font-size="16" font-weight="bold">ق</text>
                                    <text x="82" y="230" fill="#2c3e50" font-family="Tajawal,Arial" font-size="15" font-weight="bold">ح = ٢ × ط × نق</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">القطاع الدائري وطول القوس</div>
                            <div class="formula-card"><div class="formula">مساحة القطاع = (الزاوية / ٣٦٠) × ط × نق²</div></div>
                            <div class="formula-card"><div class="formula">طول القوس = (الزاوية / ٣٦٠) × ٢ × ط × نق</div></div>
                            <div class="svg-container" data-svg-id="sector-arc">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('sector-arc')">✏️</button>
                                <svg viewBox="0 0 300 260" width="100%" style="max-width:300px;">
                                    <circle cx="150" cy="130" r="90" fill="none" stroke="#e0e0e0" stroke-width="1.5" stroke-dasharray="4,4"/>
                                    <path d="M 150 130 L 240 130 A 90 90 0 0 0 195 52 Z" fill="rgba(245,171,74,0.2)" stroke="#f5ab4a" stroke-width="3"/>
                                    <circle cx="150" cy="130" r="5" fill="#2c3e50"/>
                                    <path d="M 175 130 A 25 25 0 0 0 172 116" fill="none" stroke="#d99335" stroke-width="2.5"/>
                                    <text x="180" y="125" fill="#d99335" font-family="Tajawal,Arial" font-size="14" font-weight="bold">هـ°</text>
                                    <text x="195" y="100" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="14" font-weight="bold">نق</text>
                                    <text x="50" y="250" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">م = (هـ / ٣٦٠) × ط × نق²</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">الزاوية المحيطية والمركزية</div>
                            <div class="formula-card"><div class="formula">الزاوية المحيطية = نصف الزاوية المركزية</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">خصائص المماس والوتر</div>
                            <div class="rule-content"><ul>
                                <li>المماس عمودي على نصف القطر عند نقطة التماس</li>
                                <li>العمود من المركز على الوتر ينصفه</li>
                                <li>المماسان المرسومان من نقطة خارجية متساويان</li>
                            </ul></div>
                        </div>
                    </div>
                </div>

                <!-- الأشكال الرباعية -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. الأشكال الرباعية والمضلعات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g4')" data-id="g4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المربع</div>
                            <div class="formula-card"><div class="formula">المساحة = ل²  |  المحيط = ٤ل  |  القطر = ل√٢</div></div>
                            <div class="svg-container" data-svg-id="square">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('square')">✏️</button>
                                <svg viewBox="0 0 280 260" width="100%" style="max-width:280px;">
                                    <rect x="60" y="50" width="160" height="160" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="60" y1="50" x2="220" y2="210" stroke="#e74c3c" stroke-width="2" stroke-dasharray="6,4"/>
                                    <rect x="60" y="50" width="16" height="16" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <text x="130" y="42" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="18" font-weight="bold">ل</text>
                                    <text x="230" y="138" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="18" font-weight="bold">ل</text>
                                    <text x="135" y="120" fill="#e74c3c" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ل√٢</text>
                                    <text x="72" y="248" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">م = ل²، ح = ٤ل</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المستطيل</div>
                            <div class="formula-card"><div class="formula">المساحة = ط × ع  |  المحيط = ٢(ط + ع)</div></div>
                            <div class="svg-container" data-svg-id="rectangle">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('rectangle')">✏️</button>
                                <svg viewBox="0 0 320 230" width="100%" style="max-width:320px;">
                                    <rect x="40" y="70" width="240" height="120" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <rect x="40" y="70" width="16" height="16" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <text x="145" y="58" fill="#d99335" font-family="Tajawal,Arial" font-size="18" font-weight="bold">ط</text>
                                    <text x="290" y="138" fill="#e74c3c" font-family="Tajawal,Arial" font-size="18" font-weight="bold">ع</text>
                                    <text x="100" y="220" fill="#2c3e50" font-family="Tajawal,Arial" font-size="14" font-weight="bold">م = ط × ع</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">متوازي الأضلاع</div>
                            <div class="formula-card"><div class="formula">المساحة = القاعدة × الارتفاع</div></div>
                            <div class="svg-container" data-svg-id="parallelogram">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('parallelogram')">✏️</button>
                                <svg viewBox="0 0 320 200" width="100%" style="max-width:320px;">
                                    <polygon points="90,150 150,50 280,50 220,150" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="150" y1="50" x2="150" y2="150" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="8,4"/>
                                    <rect x="142" y="134" width="16" height="16" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <text x="155" y="108" fill="#e74c3c" font-family="Tajawal,Arial" font-size="15" font-weight="bold">ع</text>
                                    <text x="140" y="175" fill="#d99335" font-family="Tajawal,Arial" font-size="15" font-weight="bold">ق</text>
                                    <text x="78" y="195" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">م = ق × ع</text>
                                </svg>
                            </div>
                            <div class="rule-content"><ul>
                                <li>الأضلاع المتقابلة متساوية ومتوازية</li>
                                <li>الزوايا المتقابلة متساوية</li>
                                <li>القطران ينصّف كل منهما الآخر</li>
                            </ul></div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">شبه المنحرف</div>
                            <div class="formula-card"><div class="formula">المساحة = [(أ + ب) ÷ ٢] × ع</div></div>
                            <div class="svg-container" data-svg-id="trapezoid">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('trapezoid')">✏️</button>
                                <svg viewBox="0 0 320 210" width="100%" style="max-width:320px;">
                                    <polygon points="60,160 120,50 220,50 280,160" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="120" y1="50" x2="120" y2="160" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="8,4"/>
                                    <rect x="112" y="144" width="14" height="14" fill="none" stroke="#2c3e50" stroke-width="2"/>
                                    <text x="155" y="42" fill="#d99335" font-family="Tajawal,Arial" font-size="15" font-weight="bold">أ</text>
                                    <text x="155" y="180" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="15" font-weight="bold">ب</text>
                                    <text x="125" y="112" fill="#e74c3c" font-family="Tajawal,Arial" font-size="15" font-weight="bold">ع</text>
                                    <text x="75" y="202" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">م = [(أ + ب) ÷ ٢] × ع</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">المعين</div>
                            <div class="formula-card"><div class="formula">المساحة = (ق١ × ق٢) ÷ ٢</div></div>
                            <div class="svg-container" data-svg-id="rhombus">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('rhombus')">✏️</button>
                                <svg viewBox="0 0 280 250" width="100%" style="max-width:280px;">
                                    <polygon points="140,25 250,125 140,225 30,125" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <line x1="30" y1="125" x2="250" y2="125" stroke="#d99335" stroke-width="2.5" stroke-dasharray="6,4"/>
                                    <line x1="140" y1="25" x2="140" y2="225" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="6,4"/>
                                    <text x="185" y="118" fill="#d99335" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ق١</text>
                                    <text x="145" y="135" fill="#e74c3c" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ق٢</text>
                                    <text x="68" y="245" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">م = (ق١ × ق٢) ÷ ٢</text>
                                </svg>
                            </div>
                        </div>

                        <div class="rule-box">
                            <div class="rule-title">مجموع زوايا المضلع</div>
                            <div class="formula-card"><div class="formula">مجموع الزوايا الداخلية = (ن − ٢) × ١٨٠°</div></div>
                            <div class="formula-card"><div class="formula">الزاوية الداخلية للمضلع المنتظم = [(ن − ٢) × ١٨٠] ÷ ن</div></div>
                            <p style="font-size:0.9rem;">ن = عدد أضلاع المضلع</p>
                        </div>
                    </div>
                </div>

                <!-- الأشكال ثلاثية الأبعاد -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٥. الأشكال ثلاثية الأبعاد</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g5')" data-id="g5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المكعب (ل = طول الضلع)</div>
                            <div class="formula-card"><div class="formula">الحجم = ل³</div></div>
                            <div class="formula-card"><div class="formula">المساحة الكلية = ٦ل²</div></div>
                            <div class="svg-container" data-svg-id="cube">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('cube')">✏️</button>
                                <svg viewBox="0 0 260 260" width="100%" style="max-width:260px;">
                                    <polygon points="50,180 50,70 130,30 130,140" fill="#fff9f0" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <polygon points="50,70 130,30 220,70 140,110" fill="rgba(245,171,74,0.15)" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <polygon points="130,30 220,70 220,180 130,140" fill="rgba(217,147,53,0.1)" stroke="#d99335" stroke-width="2.5"/>
                                    <line x1="50" y1="180" x2="140" y2="140" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <line x1="140" y1="140" x2="220" y2="180" stroke="#d99335" stroke-width="2.5"/>
                                    <line x1="140" y1="140" x2="140" y2="110" stroke="#f5ab4a" stroke-width="1.5" stroke-dasharray="4,3"/>
                                    <line x1="50" y1="180" x2="140" y2="220" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="4,3"/>
                                    <line x1="220" y1="180" x2="140" y2="220" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="4,3"/>
                                    <text x="25" y="130" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="16" font-weight="bold">ل</text>
                                    <text x="80" y="255" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ح = ل³</text>
                                </svg>
                            </div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">متوازي المستطيلات</div>
                            <div class="formula-card"><div class="formula">الحجم = ط × ع × ف</div></div>
                            <div class="formula-card"><div class="formula">المساحة الكلية = ٢(ط×ع + ط×ف + ع×ف)</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الأسطوانة</div>
                            <div class="formula-card"><div class="formula">الحجم = ط × نق² × ع</div></div>
                            <div class="formula-card"><div class="formula">المساحة الجانبية = ٢ × ط × نق × ع</div></div>
                            <div class="svg-container" data-svg-id="cylinder">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('cylinder')">✏️</button>
                                <svg viewBox="0 0 260 280" width="100%" style="max-width:260px;">
                                    <ellipse cx="130" cy="60" rx="80" ry="25" fill="rgba(245,171,74,0.15)" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <line x1="50" y1="60" x2="50" y2="210" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <line x1="210" y1="60" x2="210" y2="210" stroke="#f5ab4a" stroke-width="2.5"/>
                                    <ellipse cx="130" cy="210" rx="80" ry="25" fill="rgba(217,147,53,0.1)" stroke="#d99335" stroke-width="2.5"/>
                                    <line x1="130" y1="60" x2="210" y2="60" stroke="#e74c3c" stroke-width="2.5"/>
                                    <circle cx="130" cy="60" r="4" fill="#2c3e50"/>
                                    <text x="160" y="52" fill="#e74c3c" font-family="Tajawal,Arial" font-size="14" font-weight="bold">نق</text>
                                    <text x="218" y="140" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="14" font-weight="bold">ع</text>
                                    <text x="55" y="270" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ح = ط × نق² × ع</text>
                                </svg>
                            </div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الكرة</div>
                            <div class="formula-card"><div class="formula">الحجم = ٤/٣ × ط × نق³</div></div>
                            <div class="formula-card"><div class="formula">المساحة = ٤ × ط × نق²</div></div>
                            <div class="svg-container" data-svg-id="sphere">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('sphere')">✏️</button>
                                <svg viewBox="0 0 260 260" width="100%" style="max-width:260px;">
                                    <circle cx="130" cy="130" r="95" fill="#fff9f0" stroke="#f5ab4a" stroke-width="3"/>
                                    <ellipse cx="130" cy="130" rx="95" ry="30" fill="none" stroke="#d99335" stroke-width="1.5" stroke-dasharray="6,4"/>
                                    <circle cx="130" cy="130" r="5" fill="#2c3e50"/>
                                    <line x1="130" y1="130" x2="225" y2="130" stroke="#e74c3c" stroke-width="2.5"/>
                                    <circle cx="225" cy="130" r="4" fill="#e74c3c"/>
                                    <text x="170" y="122" fill="#e74c3c" font-family="Tajawal,Arial" font-size="15" font-weight="bold">نق</text>
                                    <text x="55" y="252" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ح = ٤/٣ × ط × نق³</text>
                                </svg>
                            </div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المخروط</div>
                            <div class="formula-card"><div class="formula">الحجم = ١/٣ × ط × نق² × ع</div></div>
                            <div class="formula-card"><div class="formula">المساحة الجانبية = ط × نق × ل</div></div>
                            <p style="font-size:0.9rem;">ل = طول المائل (المولّد)</p>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الهرم</div>
                            <div class="formula-card"><div class="formula">الحجم = ١/٣ × مساحة القاعدة × الارتفاع</div></div>
                        </div>
                    </div>
                </div>

                <!-- هندسة الإحداثيات -->
                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٦. هندسة الإحداثيات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('g6')" data-id="g6">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-box">
                            <div class="rule-title">المسافة بين نقطتين</div>
                            <div class="formula-card"><div class="formula">المسافة = √[(س٢−س١)² + (ص٢−ص١)²]</div></div>
                            <div class="svg-container" data-svg-id="distance-formula">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('distance-formula')">✏️</button>
                                <svg viewBox="0 0 300 280" width="100%" style="max-width:300px;">
                                    <line x1="30" y1="240" x2="280" y2="240" stroke="#2c3e50" stroke-width="2"/>
                                    <line x1="30" y1="240" x2="30" y2="20" stroke="#2c3e50" stroke-width="2"/>
                                    <polygon points="280,240 272,236 272,244" fill="#2c3e50"/>
                                    <polygon points="30,20 26,28 34,28" fill="#2c3e50"/>
                                    <text x="270" y="258" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">س</text>
                                    <text x="12" y="30" fill="#2c3e50" font-family="Tajawal,Arial" font-size="13" font-weight="bold">ص</text>
                                    <circle cx="80" cy="180" r="6" fill="#f5ab4a"/>
                                    <circle cx="230" cy="70" r="6" fill="#e74c3c"/>
                                    <line x1="80" y1="180" x2="230" y2="70" stroke="#27ae60" stroke-width="2.5"/>
                                    <line x1="80" y1="180" x2="230" y2="180" stroke="#d99335" stroke-width="2" stroke-dasharray="6,4"/>
                                    <line x1="230" y1="180" x2="230" y2="70" stroke="#d99335" stroke-width="2" stroke-dasharray="6,4"/>
                                    <rect x="218" y="168" width="12" height="12" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
                                    <text x="55" y="200" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="12" font-weight="bold">(س١، ص١)</text>
                                    <text x="205" y="60" fill="#e74c3c" font-family="Tajawal,Arial" font-size="12" font-weight="bold">(س٢، ص٢)</text>
                                    <text x="135" y="200" fill="#d99335" font-family="Tajawal,Arial" font-size="12" font-weight="bold">س٢−س١</text>
                                    <text x="235" y="130" fill="#d99335" font-family="Tajawal,Arial" font-size="12" font-weight="bold">ص٢−ص١</text>
                                </svg>
                            </div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">نقطة المنتصف</div>
                            <div class="formula-card"><div class="formula">نقطة المنتصف = ((س١+س٢)/٢ ، (ص١+ص٢)/٢)</div></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">الميل</div>
                            <div class="formula-card"><div class="formula">الميل = (ص٢ − ص١) / (س٢ − س١)</div></div>
                            <div class="svg-container" data-svg-id="slope-line">
                                <button class="svg-edit-btn" onclick="SvgEditor.open('slope-line')">✏️</button>
                                <svg viewBox="0 0 300 260" width="100%" style="max-width:300px;">
                                    <line x1="30" y1="220" x2="280" y2="220" stroke="#2c3e50" stroke-width="2"/>
                                    <line x1="30" y1="220" x2="30" y2="20" stroke="#2c3e50" stroke-width="2"/>
                                    <polygon points="280,220 272,216 272,224" fill="#2c3e50"/>
                                    <polygon points="30,20 26,28 34,28" fill="#2c3e50"/>
                                    <line x1="50" y1="200" x2="260" y2="50" stroke="#f5ab4a" stroke-width="3"/>
                                    <circle cx="100" cy="170" r="5" fill="#d99335"/>
                                    <circle cx="210" cy="82" r="5" fill="#d99335"/>
                                    <line x1="100" y1="170" x2="210" y2="170" stroke="#27ae60" stroke-width="2" stroke-dasharray="5,3"/>
                                    <line x1="210" y1="170" x2="210" y2="82" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,3"/>
                                    <rect x="200" y="158" width="10" height="12" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
                                    <text x="140" y="190" fill="#27ae60" font-family="Tajawal,Arial" font-size="12" font-weight="bold">المسير</text>
                                    <text x="218" y="132" fill="#e74c3c" font-family="Tajawal,Arial" font-size="12" font-weight="bold">الارتفاع</text>
                                    <circle cx="65" cy="188" r="4" fill="#f5ab4a"/>
                                    <text x="38" y="210" fill="#f5ab4a" font-family="Tajawal,Arial" font-size="12" font-weight="bold">ب</text>
                                    <text x="62" y="252" fill="#2c3e50" font-family="Tajawal,Arial" font-size="12" font-weight="bold">م = الارتفاع / المسير</text>
                                </svg>
                            </div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">معادلة الخط المستقيم</div>
                            <div class="formula-card"><div class="formula">ص = م × س + ب</div></div>
                            <p style="font-size:0.9rem;">م = الميل، ب = المقطع الصادي</p>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">التوازي والتعامد</div>
                            <div class="formula-card"><div class="formula">خطان متوازيان: م١ = م٢</div></div>
                            <div class="formula-card"><div class="formula">خطان متعامدان: م١ × م٢ = −١</div></div>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    // ==================== الجبر والإحصاء ====================
    getAlgebraContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">🧮 الجبر والإحصاء</h1>
                <p class="section-description">المتطابقات والتحليل والاحتمالات والإحصاء</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>١. المتطابقات الشهيرة</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('a1')" data-id="a1">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">(أ + ب)² = أ² + ٢أب + ب²</div></div>
                        <div class="formula-card"><div class="formula">(أ − ب)² = أ² − ٢أب + ب²</div></div>
                        <div class="formula-card"><div class="formula">(أ + ب)(أ − ب) = أ² − ب²</div></div>
                        <div class="formula-card"><div class="formula">(أ + ب)³ = أ³ + ٣أ²ب + ٣أب² + ب³</div></div>
                        <div class="formula-card"><div class="formula">(أ − ب)³ = أ³ − ٣أ²ب + ٣أب² − ب³</div></div>
                        <div class="formula-card"><div class="formula">أ³ + ب³ = (أ + ب)(أ² − أب + ب²)</div></div>
                        <div class="formula-card"><div class="formula">أ³ − ب³ = (أ − ب)(أ² + أب + ب²)</div></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٢. التحليل إلى عوامل</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('a2')" data-id="a2">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="rule-content"><ul>
                            <li>إخراج العامل المشترك الأكبر</li>
                            <li>الفرق بين مربعين: أ² − ب² = (أ+ب)(أ−ب)</li>
                            <li>مجموع وفرق المكعبين</li>
                            <li>تحليل ثلاثي الحدود: س² + (أ+ب)س + أب = (س+أ)(س+ب)</li>
                        </ul></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٣. الإحصاء</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('a3')" data-id="a3">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">المتوسط الحسابي = مجموع القيم ÷ عددها</div></div>
                        <div class="rule-box">
                            <div class="rule-title">الوسيط</div>
                            <div class="rule-content"><p>القيمة الوسطى بعد ترتيب البيانات تصاعدياً</p></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المنوال</div>
                            <div class="rule-content"><p>القيمة الأكثر تكراراً</p></div>
                        </div>
                        <div class="rule-box">
                            <div class="rule-title">المدى</div>
                            <div class="formula-card"><div class="formula">المدى = أكبر قيمة − أصغر قيمة</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٤. الاحتمالات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('a4')" data-id="a4">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">الاحتمال = عدد الحالات المرغوبة ÷ عدد الحالات الكلية</div></div>
                        <div class="rule-content"><ul>
                            <li>٠ ≤ الاحتمال ≤ ١</li>
                            <li>احتمال الحدث المؤكد = ١</li>
                            <li>احتمال الحدث المستحيل = ٠</li>
                            <li>ح(أ) + ح(أَ) = ١  (الحدث ونقيضه)</li>
                            <li>ح(أ أو ب) = ح(أ) + ح(ب) − ح(أ و ب)</li>
                        </ul></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>٥. اللوغاريتمات</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('a5')" data-id="a5">☆</button>
                    </div>
                    <div class="card-body">
                        <div class="formula-card"><div class="formula">لو_أ(ب) = ﺟ  ←  أ^ﺟ = ب</div></div>
                        <div class="formula-card"><div class="formula">لو(أ × ب) = لو(أ) + لو(ب)</div></div>
                        <div class="formula-card"><div class="formula">لو(أ / ب) = لو(أ) − لو(ب)</div></div>
                        <div class="formula-card"><div class="formula">لو(أ^ن) = ن × لو(أ)</div></div>
                    </div>
                </div>
            </div>`;
    },

    // ==================== استراتيجيات النجاح ====================
    getStrategiesContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">⚡ استراتيجيات النجاح</h1>
                <p class="section-description">إرشادات للتفوق في الاختبار</p>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>⏱️ إدارة الوقت</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('s1')" data-id="s1">☆</button>
                    </div>
                    <div class="card-body"><div class="rule-content"><ul>
                        <li>٢٤ سؤال في ٢٥ دقيقة</li>
                        <li>متوسط: دقيقة لكل سؤال</li>
                        <li>السهل: ٣٠ ثانية</li>
                        <li>الصعب: دقيقة ونصف</li>
                        <li>احتفظ بـ ٣ دقائق للمراجعة</li>
                    </ul></div></div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>❌ تقنية الاستبعاد</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('s2')" data-id="s2">☆</button>
                    </div>
                    <div class="card-body"><div class="rule-content"><ul>
                        <li>احذف الإجابة المستحيلة</li>
                        <li>احذف المتناقضة مع السؤال</li>
                        <li>احذف المتشابهة جداً (غالباً كلاهما خطأ)</li>
                        <li>اختر من الباقي</li>
                    </ul></div></div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>🎯 إرشادات أساسية</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('s3')" data-id="s3">☆</button>
                    </div>
                    <div class="card-body"><div class="rule-content"><ul>
                        <li>احرص على الإجابة على جميع الأسئلة (لا توجد درجات سالبة)</li>
                        <li>إذا استغرق السؤال أكثر من دقيقتين، قدّر الإجابة وانتقل</li>
                        <li>اعتمد على إجابتك الأولى (لا تغيّر إلا بعد التأكد)</li>
                        <li>استخدم الطرق المختصرة بدلاً من الحلول المطوّلة</li>
                        <li>تحقّق من الوحدات المستخدمة</li>
                    </ul></div></div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>🌙 ليلة الاختبار</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('s4')" data-id="s4">☆</button>
                    </div>
                    <div class="card-body"><div class="rule-content"><ul>
                        <li>احصل على قسط كافٍ من النوم (٨ ساعات)</li>
                        <li>تجنّب دراسة محتوى جديد</li>
                        <li>راجع الطرق والقوانين الأساسية</li>
                        <li>جهّز الأوراق والوثائق المطلوبة</li>
                    </ul></div></div>
                </div>

                <div class="card">
                    <div class="card-header" onclick="this.parentElement.querySelector('.card-body').classList.toggle('collapsed')">
                        <span>☀️ يوم الاختبار</span>
                        <button class="bookmark-btn" onclick="event.stopPropagation(); Bookmarks.toggle('s5')" data-id="s5">☆</button>
                    </div>
                    <div class="card-body"><div class="rule-content"><ul>
                        <li>تناول وجبة إفطار صحية</li>
                        <li>توجّه إلى مقر الاختبار مبكراً</li>
                        <li>تنفّس بعمق واسترخِ</li>
                        <li>ابدأ بالبسملة والدعاء</li>
                    </ul></div></div>
                </div>
            </div>`;
    },

    // ==================== المفضلة ====================
    getBookmarksContent() {
        const bookmarks = Bookmarks.getAll();
        if (bookmarks.length === 0) {
            return `<div class="content-section">
                <h1 class="section-title">⭐ المفضلة</h1>
                <p class="section-description">لم تقم بحفظ أي عناصر بعد</p>
                <div class="rule-box"><div class="rule-content"><p>اضغط على ☆ بجانب أي قانون لحفظه في المفضلة</p></div></div>
            </div>`;
        }
        return `<div class="content-section">
            <h1 class="section-title">⭐ المفضلة</h1>
            <p class="section-description">لديك ${bookmarks.length} عنصر محفوظ</p>
            <div class="rule-box"><div class="rule-content">
                <button class="icon-btn" style="margin-top:1rem;" onclick="Bookmarks.clearAll()">مسح الكل</button>
            </div></div>
        </div>`;
    },

    // ==================== المزيد ====================
    getMoreContent() {
        return `
            <div class="content-section">
                <h1 class="section-title">☰ المزيد</h1>
                <div class="cards-grid">
                    <div class="card" onclick="Navigation.goTo('algebra')">
                        <div class="card-header"><span>🧮 الجبر والإحصاء</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>المتطابقات، التحليل، الاحتمالات، اللوغاريتمات</p></div>
                    </div>
                    <div class="card" onclick="Navigation.goTo('strategies')">
                        <div class="card-header"><span>⚡ استراتيجيات النجاح</span><span class="card-icon">←</span></div>
                        <div class="card-body"><p>إرشادات للتفوق في الاختبار</p></div>
                    </div>
                    <div class="card" onclick="App.toggleDarkMode()">
                        <div class="card-header"><span>🌙 الوضع الليلي</span><span class="card-icon">⚙️</span></div>
                        <div class="card-body"><p>تفعيل/إلغاء الوضع الليلي</p></div>
                    </div>
                </div>
                <div class="rule-box">
                    <div class="rule-title">حول التطبيق</div>
                    <div class="rule-content"><p>الإصدار: ١.٠.٠</p><p>إعداد: يمناك</p></div>
                </div>
            </div>`;
    },

    setupSectionInteractions() { Bookmarks.updateAllButtons(); SvgEditor.loadFromGitHub(); },
    toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('overlay').classList.toggle('active'); },
    closeSidebar() { document.getElementById('sidebar').classList.remove('active'); document.getElementById('overlay').classList.remove('active'); },
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        const s = document.getElementById('dark-mode-style');
        const b = document.getElementById('darkModeBtn');
        if (this.darkMode) { s.removeAttribute('disabled'); b.textContent = '☀️'; localStorage.setItem('darkMode','true'); this.showToast('تم تفعيل الوضع الليلي'); }
        else { s.setAttribute('disabled','true'); b.textContent = '🌙'; localStorage.setItem('darkMode','false'); this.showToast('تم إلغاء الوضع الليلي'); }
    },
    loadDarkModePreference() { if (localStorage.getItem('darkMode')==='true') { this.darkMode=true; document.getElementById('dark-mode-style').removeAttribute('disabled'); document.getElementById('darkModeBtn').textContent='☀️'; } },
    showToast(message, duration=2000) { const t=document.getElementById('toast'); t.textContent=message; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),duration); },
    installPrompt: null,
    checkInstallPrompt() { window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();this.installPrompt=e;}); },
    installApp() { if(this.installPrompt){this.installPrompt.prompt();this.installPrompt=null;}else{this.showToast('غير مدعوم');} }
};

// ==================== تحويل الأرقام ====================
const ArabicNumerals = {
    map: {'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'},
    convert(text) { return String(text).replace(/[0-9]/g, d => this.map[d]); }
};

// ==================== محرر الرسومات المرئي ====================
const SvgEditor = {
    currentId: null,
    originalSvg: {},
    selectedIndex: -1,
    elements: [],
    isDragging: false,
    dragInfo: null,
    codeVisible: false,

    // أسماء العناصر بالعربية
    elNames: { line:'خط', rect:'مستطيل', circle:'دائرة', ellipse:'قطع ناقص', polygon:'مضلع', path:'مسار', text:'نص' },

    open(svgId) {
        this.currentId = svgId;
        this.selectedIndex = -1;
        this.codeVisible = false;
        const container = document.querySelector(`[data-svg-id="${svgId}"]`);
        if (!container) return;
        const svg = container.querySelector('svg');
        if (!svg) return;

        if (!this.originalSvg[svgId]) this.originalSvg[svgId] = svg.outerHTML;
        const saved = localStorage.getItem('svg-' + svgId);
        const svgCode = saved || svg.outerHTML;

        let modal = document.getElementById('svgEditorModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'svgEditorModal';
            modal.className = 'svg-editor-modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="svg-editor-content">
                <div class="svg-editor-header">
                    <h3>✏️ تعديل الرسم التوضيحي</h3>
                    <button class="svg-editor-close" onclick="SvgEditor.close()">✕</button>
                </div>
                <div class="svg-editor-body">
                    <div class="svg-editor-preview" id="svgPreview">${svgCode}</div>
                    <div class="svg-visual-controls" id="svgVisualControls">
                        <h4>عناصر الرسم</h4>
                        <div class="svg-elements-list" id="svgElementsList"></div>
                        <div class="svg-property-panel" id="svgPropertyPanel"></div>
                        <div class="svg-controls-actions">
                            <button class="svg-add-btn" onclick="SvgEditor.addElement('line')">+ خط</button>
                            <button class="svg-add-btn" onclick="SvgEditor.addElement('circle')">+ دائرة</button>
                            <button class="svg-add-btn" onclick="SvgEditor.addElement('rect')">+ مستطيل</button>
                            <button class="svg-add-btn" onclick="SvgEditor.addElement('text')">+ نص</button>
                            <button class="svg-delete-btn" id="svgDeleteBtn" onclick="SvgEditor.deleteElement()" style="display:none;">حذف العنصر</button>
                        </div>
                    </div>
                    <button class="svg-code-toggle" onclick="SvgEditor.toggleCode()">
                        <span id="codeToggleArrow">◄</span> عرض الكود المصدري
                    </button>
                    <div class="svg-editor-code-wrapper" id="svgCodeWrapper">
                        <textarea class="svg-editor-code" id="svgCodeEditor" dir="ltr" spellcheck="false">${this.escapeHtml(svgCode)}</textarea>
                    </div>
                </div>
                <div class="svg-editor-footer">
                    <button class="svg-editor-btn save" onclick="SvgEditor.save()">💾 حفظ</button>
                    <button class="svg-editor-btn preview" onclick="SvgEditor.syncFromCode()">🔄 تحديث من الكود</button>
                    <button class="svg-editor-btn reset" onclick="SvgEditor.reset()">↩️ إعادة تعيين</button>
                    <button class="svg-editor-btn close" onclick="SvgEditor.close()">إغلاق</button>
                </div>
            </div>`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.parseElements();
        this.renderElementList();
        this.setupPreviewDrag();
    },

    parseElements() {
        const preview = document.getElementById('svgPreview');
        const svg = preview ? preview.querySelector('svg') : null;
        if (!svg) { this.elements = []; return; }
        this.elements = [];
        svg.childNodes.forEach((node, i) => {
            if (node.nodeType === 1) {
                const tag = node.tagName.toLowerCase();
                if (['line','rect','circle','ellipse','polygon','path','text'].includes(tag)) {
                    this.elements.push({ index: i, tag, node });
                }
            }
        });
    },

    renderElementList() {
        const list = document.getElementById('svgElementsList');
        if (!list) return;
        list.innerHTML = this.elements.map((el, i) => {
            const name = this.elNames[el.tag] || el.tag;
            const color = el.node.getAttribute('stroke') || el.node.getAttribute('fill') || '#2c3e50';
            const sel = i === this.selectedIndex ? ' selected' : '';
            const label = el.tag === 'text' ? (el.node.textContent.substring(0, 12)) : name;
            return `<button class="svg-element-chip${sel}" onclick="SvgEditor.selectElement(${i})">
                <span class="chip-color" style="background:${color}"></span>${label}
            </button>`;
        }).join('');
    },

    selectElement(index) {
        this.selectedIndex = index;
        this.renderElementList();
        this.renderPropertyPanel();
        this.highlightElement();
        const delBtn = document.getElementById('svgDeleteBtn');
        if (delBtn) delBtn.style.display = index >= 0 ? 'inline-block' : 'none';
    },

    highlightElement() {
        const preview = document.getElementById('svgPreview');
        const svg = preview ? preview.querySelector('svg') : null;
        if (!svg) return;
        svg.querySelectorAll('.svg-element-highlight').forEach(h => h.remove());
        if (this.selectedIndex < 0 || this.selectedIndex >= this.elements.length) return;
        const el = this.elements[this.selectedIndex].node;
        const bbox = el.getBBox ? el.getBBox() : null;
        if (!bbox) return;
        const ns = 'http://www.w3.org/2000/svg';
        const highlight = document.createElementNS(ns, 'rect');
        highlight.setAttribute('class', 'svg-element-highlight');
        highlight.setAttribute('x', bbox.x - 3);
        highlight.setAttribute('y', bbox.y - 3);
        highlight.setAttribute('width', bbox.width + 6);
        highlight.setAttribute('height', bbox.height + 6);
        highlight.setAttribute('fill', 'none');
        highlight.setAttribute('stroke', '#3498db');
        highlight.setAttribute('stroke-width', '2');
        highlight.setAttribute('stroke-dasharray', '4,3');
        svg.appendChild(highlight);
    },

    renderPropertyPanel() {
        const panel = document.getElementById('svgPropertyPanel');
        if (!panel) return;
        if (this.selectedIndex < 0 || this.selectedIndex >= this.elements.length) {
            panel.classList.remove('active');
            return;
        }
        panel.classList.add('active');
        const el = this.elements[this.selectedIndex];
        const n = el.node;
        let html = '';

        const slider = (label, attr, val, min, max) => {
            const v = Math.round(parseFloat(val) || 0);
            return `<div class="svg-prop-row">
                <span class="svg-prop-label">${label}</span>
                <input type="range" class="svg-prop-slider" min="${min}" max="${max}" value="${v}" oninput="SvgEditor.updateAttr('${attr}',this.value,this)">
                <span class="svg-prop-value">${ArabicNumerals.convert(v)}</span>
            </div>`;
        };
        const colorPick = (label, attr, val) => {
            const c = val && val !== 'none' ? val : '#000000';
            return `<div class="svg-prop-row">
                <span class="svg-prop-label">${label}</span>
                <input type="color" class="svg-prop-color" value="${c}" oninput="SvgEditor.updateAttr('${attr}',this.value)">
            </div>`;
        };

        switch (el.tag) {
            case 'line':
                html += slider('س١', 'x1', n.getAttribute('x1'), 0, 400);
                html += slider('ص١', 'y1', n.getAttribute('y1'), 0, 300);
                html += slider('س٢', 'x2', n.getAttribute('x2'), 0, 400);
                html += slider('ص٢', 'y2', n.getAttribute('y2'), 0, 300);
                html += slider('سُمك', 'stroke-width', n.getAttribute('stroke-width'), 1, 10);
                html += colorPick('لون', 'stroke', n.getAttribute('stroke'));
                break;
            case 'rect':
                html += slider('س', 'x', n.getAttribute('x'), 0, 400);
                html += slider('ص', 'y', n.getAttribute('y'), 0, 300);
                html += slider('عرض', 'width', n.getAttribute('width'), 1, 400);
                html += slider('ارتفاع', 'height', n.getAttribute('height'), 1, 300);
                html += slider('سُمك', 'stroke-width', n.getAttribute('stroke-width'), 0, 10);
                html += colorPick('حدود', 'stroke', n.getAttribute('stroke'));
                html += colorPick('تعبئة', 'fill', n.getAttribute('fill'));
                break;
            case 'circle':
                html += slider('مركز س', 'cx', n.getAttribute('cx'), 0, 400);
                html += slider('مركز ص', 'cy', n.getAttribute('cy'), 0, 300);
                html += slider('نصف القطر', 'r', n.getAttribute('r'), 1, 200);
                html += slider('سُمك', 'stroke-width', n.getAttribute('stroke-width'), 0, 10);
                html += colorPick('حدود', 'stroke', n.getAttribute('stroke'));
                html += colorPick('تعبئة', 'fill', n.getAttribute('fill'));
                break;
            case 'ellipse':
                html += slider('مركز س', 'cx', n.getAttribute('cx'), 0, 400);
                html += slider('مركز ص', 'cy', n.getAttribute('cy'), 0, 300);
                html += slider('نق س', 'rx', n.getAttribute('rx'), 1, 200);
                html += slider('نق ص', 'ry', n.getAttribute('ry'), 1, 200);
                html += colorPick('حدود', 'stroke', n.getAttribute('stroke'));
                html += colorPick('تعبئة', 'fill', n.getAttribute('fill'));
                break;
            case 'text':
                html += `<div class="svg-prop-row">
                    <span class="svg-prop-label">النص</span>
                    <input type="text" class="svg-prop-text-input" value="${n.textContent}" oninput="SvgEditor.updateText(this.value)">
                </div>`;
                html += slider('س', 'x', n.getAttribute('x'), 0, 400);
                html += slider('ص', 'y', n.getAttribute('y'), 0, 300);
                html += slider('حجم', 'font-size', n.getAttribute('font-size'), 8, 40);
                html += colorPick('لون', 'fill', n.getAttribute('fill'));
                break;
            case 'polygon':
                html += `<div class="svg-prop-row">
                    <span class="svg-prop-label">نقاط</span>
                    <input type="text" class="svg-prop-text-input" dir="ltr" value="${n.getAttribute('points')}" oninput="SvgEditor.updateAttr('points',this.value)">
                </div>`;
                html += colorPick('حدود', 'stroke', n.getAttribute('stroke'));
                html += colorPick('تعبئة', 'fill', n.getAttribute('fill'));
                break;
            case 'path':
                html += `<div class="svg-prop-row">
                    <span class="svg-prop-label">مسار</span>
                    <input type="text" class="svg-prop-text-input" dir="ltr" value="${n.getAttribute('d')}" oninput="SvgEditor.updateAttr('d',this.value)">
                </div>`;
                html += slider('سُمك', 'stroke-width', n.getAttribute('stroke-width'), 0, 10);
                html += colorPick('حدود', 'stroke', n.getAttribute('stroke'));
                html += colorPick('تعبئة', 'fill', n.getAttribute('fill'));
                break;
        }
        panel.innerHTML = html;
    },

    updateAttr(attr, value, sliderEl) {
        if (this.selectedIndex < 0 || this.selectedIndex >= this.elements.length) return;
        this.elements[this.selectedIndex].node.setAttribute(attr, value);
        if (sliderEl) {
            const valSpan = sliderEl.nextElementSibling;
            if (valSpan) valSpan.textContent = ArabicNumerals.convert(Math.round(parseFloat(value)));
        }
        this.highlightElement();
        this.syncCodeFromVisual();
    },

    updateText(value) {
        if (this.selectedIndex < 0 || this.selectedIndex >= this.elements.length) return;
        this.elements[this.selectedIndex].node.textContent = value;
        this.renderElementList();
        this.syncCodeFromVisual();
    },

    addElement(type) {
        const preview = document.getElementById('svgPreview');
        const svg = preview ? preview.querySelector('svg') : null;
        if (!svg) return;
        const ns = 'http://www.w3.org/2000/svg';
        let el;
        switch (type) {
            case 'line':
                el = document.createElementNS(ns, 'line');
                el.setAttribute('x1', '50'); el.setAttribute('y1', '50');
                el.setAttribute('x2', '200'); el.setAttribute('y2', '50');
                el.setAttribute('stroke', '#f5ab4a'); el.setAttribute('stroke-width', '3');
                break;
            case 'circle':
                el = document.createElementNS(ns, 'circle');
                el.setAttribute('cx', '150'); el.setAttribute('cy', '120');
                el.setAttribute('r', '30'); el.setAttribute('fill', 'none');
                el.setAttribute('stroke', '#f5ab4a'); el.setAttribute('stroke-width', '3');
                break;
            case 'rect':
                el = document.createElementNS(ns, 'rect');
                el.setAttribute('x', '80'); el.setAttribute('y', '60');
                el.setAttribute('width', '100'); el.setAttribute('height', '80');
                el.setAttribute('fill', '#fff9f0'); el.setAttribute('stroke', '#f5ab4a');
                el.setAttribute('stroke-width', '3');
                break;
            case 'text':
                el = document.createElementNS(ns, 'text');
                el.setAttribute('x', '100'); el.setAttribute('y', '100');
                el.setAttribute('fill', '#2c3e50'); el.setAttribute('font-family', 'Tajawal,Arial');
                el.setAttribute('font-size', '16'); el.setAttribute('font-weight', 'bold');
                el.textContent = 'نص جديد';
                break;
        }
        if (el) {
            svg.appendChild(el);
            this.parseElements();
            this.renderElementList();
            this.selectElement(this.elements.length - 1);
            this.syncCodeFromVisual();
            App.showToast('تمت إضافة عنصر جديد');
        }
    },

    deleteElement() {
        if (this.selectedIndex < 0 || this.selectedIndex >= this.elements.length) return;
        const el = this.elements[this.selectedIndex].node;
        el.remove();
        this.selectedIndex = -1;
        this.parseElements();
        this.renderElementList();
        const panel = document.getElementById('svgPropertyPanel');
        if (panel) panel.classList.remove('active');
        const delBtn = document.getElementById('svgDeleteBtn');
        if (delBtn) delBtn.style.display = 'none';
        this.syncCodeFromVisual();
        App.showToast('تم حذف العنصر');
    },

    syncCodeFromVisual() {
        const preview = document.getElementById('svgPreview');
        const svg = preview ? preview.querySelector('svg') : null;
        if (!svg) return;
        const code = svg.outerHTML;
        const editor = document.getElementById('svgCodeEditor');
        if (editor) editor.value = code;
        // حفظ تلقائي عند كل تعديل
        if (this.currentId) {
            localStorage.setItem('svg-' + this.currentId, code);
            // حفظ في GitHub تلقائياً (مع تأخير لتجنب طلبات كثيرة)
            this._pendingSave = this.currentId;
            clearTimeout(this._saveTimer);
            this._saveTimer = setTimeout(() => this.saveToGitHub(this._pendingSave, code), 2000);
            const container = document.querySelector(`[data-svg-id="${this.currentId}"]`);
            if (container) {
                const oldSvg = container.querySelector('svg');
                if (oldSvg) {
                    const temp = document.createElement('div');
                    temp.innerHTML = code;
                    const newSvg = temp.querySelector('svg');
                    if (newSvg) oldSvg.replaceWith(newSvg);
                }
            }
        }
    },

    // حفظ في GitHub عبر الخادم
    async saveToGitHub(svgId, svgCode) {
        try {
            const res = await fetch('/api/save-svg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ svgId, svgCode })
            });
            if (res.ok) {
                console.log('تم الحفظ في GitHub:', svgId);
            }
        } catch (e) {
            // صامت - localStorage يعمل كنسخة احتياطية
            console.log('حفظ GitHub غير متاح، محفوظ محلياً');
        }
    },

    // تحميل من GitHub عند فتح التطبيق
    async loadFromGitHub() {
        try {
            const res = await fetch('/api/load-svg');
            if (!res.ok) return;
            const data = await res.json();
            for (const [svgId, svgCode] of Object.entries(data)) {
                localStorage.setItem('svg-' + svgId, svgCode);
            }
            this.loadSaved();
        } catch (e) {
            // صامت - نستخدم localStorage المحلي
        }
    },

    syncFromCode() {
        const editor = document.getElementById('svgCodeEditor');
        if (!editor) return;
        const code = editor.value;
        const preview = document.getElementById('svgPreview');
        if (preview) {
            preview.innerHTML = code;
            this.selectedIndex = -1;
            this.parseElements();
            this.renderElementList();
            const panel = document.getElementById('svgPropertyPanel');
            if (panel) panel.classList.remove('active');
            App.showToast('تم تحديث المعاينة');
        }
    },

    toggleCode() {
        this.codeVisible = !this.codeVisible;
        const wrapper = document.getElementById('svgCodeWrapper');
        const arrow = document.getElementById('codeToggleArrow');
        if (wrapper) wrapper.classList.toggle('visible', this.codeVisible);
        if (arrow) arrow.textContent = this.codeVisible ? '▼' : '◄';
    },

    setupPreviewDrag() {
        const preview = document.getElementById('svgPreview');
        if (!preview) return;
        preview.addEventListener('pointerdown', (e) => {
            const svg = preview.querySelector('svg');
            if (!svg || this.selectedIndex < 0) return;
            const el = this.elements[this.selectedIndex];
            if (!el) return;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX; pt.y = e.clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return;
            const svgPt = pt.matrixTransform(ctm.inverse());
            this.isDragging = true;
            this.dragInfo = { startX: svgPt.x, startY: svgPt.y, el: el };
            if (el.tag === 'circle' || el.tag === 'ellipse') {
                this.dragInfo.origCx = parseFloat(el.node.getAttribute('cx'));
                this.dragInfo.origCy = parseFloat(el.node.getAttribute('cy'));
            } else if (el.tag === 'rect') {
                this.dragInfo.origX = parseFloat(el.node.getAttribute('x'));
                this.dragInfo.origY = parseFloat(el.node.getAttribute('y'));
            } else if (el.tag === 'text') {
                this.dragInfo.origX = parseFloat(el.node.getAttribute('x'));
                this.dragInfo.origY = parseFloat(el.node.getAttribute('y'));
            } else if (el.tag === 'line') {
                this.dragInfo.origX1 = parseFloat(el.node.getAttribute('x1'));
                this.dragInfo.origY1 = parseFloat(el.node.getAttribute('y1'));
                this.dragInfo.origX2 = parseFloat(el.node.getAttribute('x2'));
                this.dragInfo.origY2 = parseFloat(el.node.getAttribute('y2'));
            }
            e.preventDefault();
        });
        preview.addEventListener('pointermove', (e) => {
            if (!this.isDragging || !this.dragInfo) return;
            const svg = preview.querySelector('svg');
            if (!svg) return;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX; pt.y = e.clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return;
            const svgPt = pt.matrixTransform(ctm.inverse());
            const dx = svgPt.x - this.dragInfo.startX;
            const dy = svgPt.y - this.dragInfo.startY;
            const el = this.dragInfo.el;
            if (el.tag === 'circle' || el.tag === 'ellipse') {
                el.node.setAttribute('cx', Math.round(this.dragInfo.origCx + dx));
                el.node.setAttribute('cy', Math.round(this.dragInfo.origCy + dy));
            } else if (el.tag === 'rect' || el.tag === 'text') {
                el.node.setAttribute('x', Math.round(this.dragInfo.origX + dx));
                el.node.setAttribute('y', Math.round(this.dragInfo.origY + dy));
            } else if (el.tag === 'line') {
                el.node.setAttribute('x1', Math.round(this.dragInfo.origX1 + dx));
                el.node.setAttribute('y1', Math.round(this.dragInfo.origY1 + dy));
                el.node.setAttribute('x2', Math.round(this.dragInfo.origX2 + dx));
                el.node.setAttribute('y2', Math.round(this.dragInfo.origY2 + dy));
            }
            this.highlightElement();
            e.preventDefault();
        });
        const endDrag = () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.dragInfo = null;
                this.syncCodeFromVisual();
                this.renderPropertyPanel();
            }
        };
        preview.addEventListener('pointerup', endDrag);
        preview.addEventListener('pointerleave', endDrag);
    },

    save() {
        const preview = document.getElementById('svgPreview');
        const svg = preview ? preview.querySelector('svg') : null;
        const code = svg ? svg.outerHTML : document.getElementById('svgCodeEditor').value;
        localStorage.setItem('svg-' + this.currentId, code);

        const container = document.querySelector(`[data-svg-id="${this.currentId}"]`);
        if (container) {
            const oldSvg = container.querySelector('svg');
            if (oldSvg) {
                const temp = document.createElement('div');
                temp.innerHTML = code;
                const newSvg = temp.querySelector('svg');
                if (newSvg) oldSvg.replaceWith(newSvg);
            }
        }
        App.showToast('تم حفظ التعديلات');
        this.close();
    },

    reset() {
        if (this.originalSvg[this.currentId]) {
            const code = this.originalSvg[this.currentId];
            document.getElementById('svgPreview').innerHTML = code;
            document.getElementById('svgCodeEditor').value = code;
            localStorage.removeItem('svg-' + this.currentId);
            this.selectedIndex = -1;
            this.parseElements();
            this.renderElementList();
            const panel = document.getElementById('svgPropertyPanel');
            if (panel) panel.classList.remove('active');
            App.showToast('تم إعادة التعيين');
        }
    },

    close() {
        const modal = document.getElementById('svgEditorModal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        this.currentId = null;
        this.selectedIndex = -1;
        this.isDragging = false;
    },

    escapeHtml(text) {
        return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    },

    loadSaved() {
        document.querySelectorAll('[data-svg-id]').forEach(container => {
            const id = container.dataset.svgId;
            const saved = localStorage.getItem('svg-' + id);
            if (saved) {
                const svg = container.querySelector('svg');
                if (svg) {
                    const temp = document.createElement('div');
                    temp.innerHTML = saved;
                    const newSvg = temp.querySelector('svg');
                    if (newSvg) svg.replaceWith(newSvg);
                }
            }
        });
    },

    // تصدير جميع التعديلات كملف
    exportAllEdits() {
        const edits = {};
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('svg-')) {
                edits[key] = localStorage.getItem(key);
                count++;
            }
        }
        if (count === 0) {
            App.showToast('لا توجد تعديلات محفوظة');
            return;
        }
        const blob = new Blob([JSON.stringify(edits, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'svg-edits.json';
        a.click();
        URL.revokeObjectURL(url);
        App.showToast('تم تصدير ' + ArabicNumerals.convert(count) + ' تعديل');
    },

    // استيراد التعديلات من ملف
    importEdits() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const edits = JSON.parse(ev.target.result);
                    let count = 0;
                    for (const [key, value] of Object.entries(edits)) {
                        if (key.startsWith('svg-')) {
                            localStorage.setItem(key, value);
                            count++;
                        }
                    }
                    this.loadSaved();
                    App.showToast('تم استيراد ' + ArabicNumerals.convert(count) + ' تعديل');
                } catch (err) {
                    App.showToast('خطأ في قراءة الملف');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
};

// التهيئة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
