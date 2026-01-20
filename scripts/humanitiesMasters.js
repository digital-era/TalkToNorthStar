const humanitiesMasters = [
    { id: "william_shakespeare", name: "William Shakespeare (威廉·莎士比亚)",
      contribution: {
        "zh-CN": "创作《哈姆雷特》《罗密欧与朱丽叶》，革新英语戏剧形式，探索人性与命运。",
        "en": "Authored Hamlet and Romeo and Juliet, revolutionized English drama, explored humanity and fate."
      },
      field: {
        "zh-CN": "戏剧、诗歌。",
        "en": "Drama, Poetry."
      },
      remarks: {
        "zh-CN": "英语文学之父，作品影响全球戏剧与电影艺术。",
        "en": "Father of English literature, works influence global theater and film."
      }
    },
    { id: "fyodor_dostoevsky", name: "Fyodor Dostoevsky (费奥多尔·陀思妥耶夫斯基)",
      contribution: {
        "zh-CN": "著有《罪与罚》《卡拉马佐夫兄弟》，剖析心理与道德困境。",
        "en": "Wrote Crime and Punishment, The Brothers Karamazov, probed psychological and moral dilemmas."
      },
      field: {
        "zh-CN": "小说、哲学文学。",
        "en": "Novel, Philosophical Literature."
      },
      remarks: {
        "zh-CN": "俄罗斯文学巨擘，影响心理学与存在主义思想。",
        "en": "Russian literary giant, influenced psychology and existentialism."
      }
    },
    { id: "leo_tolstoy", name: "Leo Tolstoy (列夫·托尔斯泰)",
      contribution: {
        "zh-CN": "创作《战争与和平》《安娜·卡列尼娜》，描绘社会与个人命运。",
        "en": "Authored War and Peace, Anna Karenina, depicted society and personal fate."
      },
      field: {
        "zh-CN": "现实主义小说。",
        "en": "Realist Novel."
      },
      remarks: {
        "zh-CN": "最伟大小说家之一，推动文学对历史的反思。",
        "en": "Among greatest novelists, advanced literary reflection on history."
      }
    },
    { id: "miguel_de_cervantes", name: "Miguel de Cervantes (米格尔·德·塞万提斯)",
      contribution: {
        "zh-CN": "撰写《堂吉诃德》，开创现代小说，讽刺理想与现实冲突。",
        "en": "Wrote Don Quixote, pioneered modern novel, satirized ideal vs. reality."
      },
      field: {
        "zh-CN": "小说、讽刺文学。",
        "en": "Novel, Satirical Literature."
      },
      remarks: {
        "zh-CN": "西班牙文学奠基人，标志小说向现实主义转变。",
        "en": "Spanish literature founder, marked novel’s shift to realism."
      }
    },
    { id: "homer", name: "Homer (荷马)",
      contribution: {
        "zh-CN": "创作《伊利亚特》《奥德赛》，奠定西方叙事文学传统。",
        "en": "Authored Iliad, Odyssey, established Western narrative tradition."
      },
      field: {
        "zh-CN": "史诗诗歌。",
        "en": "Epic Poetry."
      },
      remarks: {
        "zh-CN": "古希腊文学之源，影响神话与英雄叙事千年。",
        "en": "Source of Greek literature, influenced myth and heroic narrative."
      }
    },
    { id: "charles_dickens", name: "Charles Dickens (查尔斯·狄更斯)",
      contribution: {
        "zh-CN": "著有《雾都孤儿》《双城记》，揭示维多利亚时代社会不公。",
        "en": "Wrote Oliver Twist, A Tale of Two Cities, exposed Victorian social injustices."
      },
      field: {
        "zh-CN": "社会小说。",
        "en": "Social Novel."
      },
      remarks: {
        "zh-CN": "维多利亚文学代表，推动文学为社会改革工具。",
        "en": "Victorian literature leader, used novels for social reform."
      }
    },
    { id: "victor_hugo", name: "Victor Hugo (维克多·雨果)",
      contribution: {
        "zh-CN": "著有《悲惨世界》《巴黎圣母院》《世纪传说》，探讨社会正义、人类苦难与道德哲学。",
        "en": "Authored Les Misérables, La Légende des siècles and The Hunchback of Notre-Dame, explored social justice, human suffering, and moral philosophy."
      },
      field: {
        "zh-CN": "小说、诗歌、戏剧。",
        "en": "Novel, Poetry, Drama."
      },
      remarks: {
        "zh-CN": "法国浪漫主义运动领袖，推动文学与社会改革。",
        "en": "Leader of French Romanticism, advanced literature and social reform."
      }
    },
    { id: "romain_rolland", name: "Romain Rolland (罗曼·罗兰)",
      contribution: {
        "zh-CN": "创作《约翰·克里斯朵夫》，以音乐家传记式长河小说探索英雄生命与人类合一，著有《贝多芬传》等名人传。",
        "en": "Authored Jean-Christophe, an epic river-novel depicting heroic life and human unity through a musician’s biography; wrote celebrated lives including Beethoven."
      },
      field: {
        "zh-CN": "长河小说、传记文学、音乐评论、戏剧。",
        "en": "River Novel, Biographical Literature, Music Criticism, Drama."
      },
      remarks: {
        "zh-CN": "1915年诺贝尔文学奖得主，一战期间‘超于混战之上’的反战宣言代表20世纪知识分子良知。",
        "en": "1915 Nobel Prize in Literature laureate; his WWI manifesto Above the Battle became the conscience of 20th-century intellectuals."
      }
    },
    { id: "stefan_zweig", name: "Stefan Zweig (斯蒂芬·茨威格)",
      contribution: {
        "zh-CN": "创作《人类的群星闪耀时》《昨日的世界》，以历史瞬间与自传体裁书写人类命运与欧洲文明的兴衰。",
        "en": "Authored The Tide of Fortune and The World of Yesterday, capturing decisive moments in history and the fall of European civilization through historical miniatures and memoir."
      },
      field: {
        "zh-CN": "中短篇小说、心理传记、历史瞬间写作。",
        "en": "Novella, Psychological Biography, Historical Miniatures."
      },
      remarks: {
        "zh-CN": "20世纪上半叶德语最畅销作家，以优雅文体与深刻同情心书写欧洲文明的兴衰。",
        "en": "Best-selling German-language writer of the early 20th century, chronicled Europe’s rise and fall with elegance and empathy."
      }
    },
    { id: "mikhail_sholokhov", name: "Mikhail Sholokhov (米哈伊尔·肖洛霍夫)",
      contribution: {
        "zh-CN": "著有《静静的顿河》《被开垦的处女地》，描绘顿河哥萨克人在革命与内战中的命运，推动社会主义现实主义文学。",
        "en": "Authored Quiet Flows the Don and Virgin Soil Upturned, depicted Don Cossack lives during revolution and civil war, advanced socialist realism literature."
      },
      field: {
        "zh-CN": "小说、现实主义文学。",
        "en": "Novel, Realist Literature."
      },
      remarks: {
        "zh-CN": "1965年诺贝尔文学奖得主，苏联文学巨擘，其作品影响全球对俄罗斯历史的文学理解。",
        "en": "1965 Nobel Prize in Literature laureate, Soviet literary giant, works influence global literary understanding of Russian history."
      }
    },
    { id: "virginia_woolf", name: "Virginia Woolf (弗吉尼亚·伍尔夫)",
      contribution: {
        "zh-CN": "创作《达洛维夫人》，创新意识流，探索女性内心世界。",
        "en": "Authored Mrs Dalloway, pioneered stream-of-consciousness, explored female psyche."
      },
      field: {
        "zh-CN": "现代主义小说。",
        "en": "Modernist Novel."
      },
      remarks: {
        "zh-CN": "女性主义文学先驱，革新叙事视角与结构。",
        "en": "Feminist literature pioneer, transformed narrative perspective."
      }
    },
    { id: "ernest_hemingway", name: "Ernest Hemingway (欧内斯特·海明威)",
      contribution: {
        "zh-CN": "创作《老人与海》《永别了，武器》，简洁文风刻画人性，获诺贝尔奖。",
        "en": "Wrote The Old Man and the Sea, A Farewell to Arms, concise style, won Nobel Prize."
      },
      field: {
        "zh-CN": "现实主义小说。",
        "en": "Realist Novel."
      },
      remarks: {
        "zh-CN": "美国文学代表，冰山理论影响现代叙事风格。",
        "en": "American literature icon, iceberg theory shaped modern narrative."
      }
    },
    { id: "gabriel_garcia_marquez", name: "Gabriel García Márquez (加布里埃尔·加西亚·马尔克斯)",
      contribution: {
        "zh-CN": "创作《百年孤独》，开创魔幻现实主义，融合拉美神话历史。",
        "en": "Wrote One Hundred Years of Solitude, pioneered magical realism, blended Latin American myth."
      },
      field: {
        "zh-CN": "魔幻现实主义。",
        "en": "Magical Realism."
      },
      remarks: {
        "zh-CN": "拉美文学代表，获诺贝尔奖，桥接西方与拉美叙事。",
        "en": "Latin American literary icon, Nobel laureate, bridged Western and Latin narratives."
      }
    },
    { id: "franz_kafka", name: "Franz Kafka (弗兰茨·卡夫卡)",
      contribution: {
        "zh-CN": "著有《变形记》《审判》，描绘荒诞与存在焦虑。",
        "en": "Wrote The Metamorphosis, The Trial, depicted absurdity and existential anxiety."
      },
      field: {
        "zh-CN": "现代主义小说。",
        "en": "Modernist Novel."
      },
      remarks: {
        "zh-CN": "卡夫卡式概念定义现代异化感，影响深远。",
        "en": "Kafkaesque defined modern alienation, profoundly influential."
      }
    },
    { id: "agatha_christie", name: "Agatha Christie (阿加莎·克里斯蒂)",
      contribution: {
        "zh-CN": "创作《东方快车谋杀案》《无人生还》，开创黄金时代本格推理，发明精密诡计与惊人反转。",
        "en": "Authored Murder on the Orient Express and And Then There Were None, pioneered Golden Age puzzle mysteries with intricate plots and twists."
      },
      field: {
        "zh-CN": "悬疑·推理小说、本格派。",
        "en": "Mystery & Detective Fiction, Classic Whodunit."
      },
      remarks: {
        "zh-CN": "推理小说女王，全球销量超20亿册，永恒定义封闭空间与公平推理规则。",
        "en": "Queen of Crime, over 2 billion books sold, eternally defined locked-room and fair-play mysteries."
      }
    },
    { id: "arthur_conan_doyle", name: "Arthur Conan Doyle (阿瑟·柯南·道尔)",
      contribution: {
        "zh-CN": "创作《福尔摩斯探案全集》《巴斯克维尔的猎犬》，创立现代侦探形象与科学逻辑推理模式。",
        "en": "Authored The Adventures of Sherlock Holmes and The Hound of the Baskervilles, created modern detective archetype and scientific deduction."
      },
      field: {
        "zh-CN": "侦探小说、硬汉推理。",
        "en": "Detective Fiction, Rational Deduction."
      },
      remarks: {
        "zh-CN": "侦探小说之父，夏洛克·福尔摩斯成为全球最具标志性的文学角色。",
        "en": "Father of the detective novel; Sherlock Holmes remains the most iconic literary character worldwide."
      }
    },
    { id: "gillian_flynn", name: "Gillian Flynn (吉莉安·弗林)",
      contribution: {
        "zh-CN": "创作《消失的爱人》《利器》，革新心理悬疑与不可靠叙述者手法，开创21世纪国内惊悚潮流。",
        "en": "Authored Gone Girl and Sharp Objects, revolutionized psychological suspense with unreliable narrators, launched 21st-century domestic thriller wave."
      },
      field: {
        "zh-CN": "心理悬疑、惊悚小说。",
        "en": "Psychological Thriller, Domestic Suspense."
      },
      remarks: {
        "zh-CN": "当代悬疑大师，其双重视角与颠覆性反转深刻影响全球流行文化与影视改编。",
        "en": "Leading contemporary master of suspense; dual-perspective twists profoundly shaped modern popular culture and adaptations."
      }
    },
    { id: "plutarch", name: "Plutarch (普鲁塔克)",
      contribution: {
        "zh-CN": "撰写《希腊罗马名人传》，以比较传记揭示历史人物品格与命运。",
        "en": "Authored Parallel Lives, revealed character and fate of historical figures through comparative biographies."
      },
      field: {
        "zh-CN": "历史传记、比较文学。",
        "en": "Historical Biography, Comparative Literature."
      },
      remarks: {
        "zh-CN": "古代传记文学奠基人，影响西方历史与文学叙事。",
        "en": "Founder of ancient biography, shaped Western historical and literary narrative."
      }
    },
    { id: "edward_gibbon", name: "爱德华·吉本 (Edward Gibbon)",
      contribution: {
        "zh-CN": "撰写《罗马帝国衰亡史》，以理性批判精神系统叙述罗马帝国从鼎盛到灭亡的全过程，深刻分析基督教兴起对古典文明的影响。",
        "en": "Authored The History of the Decline and Fall of the Roman Empire, systematically narrated the rise and fall of the Roman Empire with rational and critical spirit, profoundly analyzing the impact of Christianity's rise on classical civilization."
      },
      field: {
        "zh-CN": "史学、古典史、启蒙史学。",
        "en": "Historiography, Classical History, Enlightenment Historiography."
      },
      remarks: {
        "zh-CN": "18世纪最伟大的历史学家，其优雅文体与广阔视野使该书成为西方史学经典，对理性主义史观影响深远。",
        "en": "The greatest historian of the 18th century; his elegant style and broad perspective made the work a classic of Western historiography, profoundly influencing rationalist historical views."
      }
    },
    {id: "jacob_burckhardt", name: "雅各布·布克哈特 (Jacob Burckhardt)",
      contribution: {
        "zh-CN": "撰写《意大利文艺复兴时期的文化》，开创文化史研究范式，首次系统描绘文艺复兴时期意大利人的精神面貌、生活方式与艺术成就。",
        "en": "Authored The Civilization of the Renaissance in Italy, pioneered the paradigm of cultural history, and was the first to systematically depict the spiritual outlook, way of life, and artistic achievements of Italians during the Renaissance."
      },
      field: {
        "zh-CN": "史学、文化史、文艺复兴研究。",
        "en": " Historiography, Cultural History, Renaissance Studies."
      },
      remarks: {
        "zh-CN": "现代文化史之父，其著作奠定了‘文艺复兴’作为独立历史时期的经典概念，对19–20世纪欧洲文化史研究影响巨大。",
        "en": "Father of modern cultural history; his work established the classic concept of the 'Renaissance' as a distinct historical period, exerting immense influence on European cultural history studies in the 19th and 20th centuries."
      }
    },
    { id: "plato", name: "Plato (柏拉图)",
      contribution: {
        "zh-CN": "提出理念论，著《理想国》，创立西方第一所高等学府阿卡德米学园，奠定形而上学与政治哲学根基。",
        "en": "Proposed the theory of Forms, authored The Republic, founded the Academy—the West’s first institution of higher learning, establishing foundations of metaphysics and political philosophy."
      },
      field: {
        "zh-CN": "形而上学、政治哲学、认识论、教育哲学。",
        "en": "Metaphysics, Political Philosophy, Epistemology, Philosophy of Education."
      },
      remarks: {
        "zh-CN": "西方观念论之父，整个西方哲学传统被怀特海称为‘对柏拉图的一系列注脚’。",
        "en": "Father of Western idealism; the entire Western philosophical tradition described by Whitehead as ‘a series of footnotes to Plato’."
      }
    },
    { id: "aristotle", name: "Aristotle (亚里士多德)",
      contribution: {
        "zh-CN": "创立形式逻辑、四因说与中道伦理学，构建百科全书式哲学体系，奠定西方科学与学科分类基础。",
        "en": "Founded formal logic, four causes theory, and virtue ethics of the mean; constructed an encyclopedic philosophical system, laying foundations for Western science and disciplinary division."
      },
      field: {
        "zh-CN": "形而上学、逻辑学、伦理学、政治学、自然哲学。",
        "en": "Metaphysics, Logic, Ethics, Politics, Natural Philosophy."
      },
      remarks: {
        "zh-CN": "西方哲学之父，从古希腊至17世纪两千年间被尊为‘最权威者’，大学学科划分源自其分类。",
        "en": "The Philosopher of Western tradition; ultimate authority for two millennia; modern university disciplines originate from his classification."
      }
    },
    { id: "immanuel_kant", name: "Immanuel Kant (伊曼努尔·康德)",
      contribution: {
        "zh-CN": "著三大批判，完成认识论‘哥白尼式革命’，提出定言命令与人为自然与道德立法原则。",
        "en": "Authored the three Critiques, accomplished the Copernican revolution in epistemology, proposed the categorical imperative and human legislation for nature and morality."
      },
      field: {
        "zh-CN": "认识论、伦理学、形而上学、美学。",
        "en": "Epistemology, Ethics, Metaphysics, Aesthetics."
      },
      remarks: {
        "zh-CN": "近代哲学的转折点与集大成者，后世所有重要哲学流派皆须回应其体系。",
        "en": "The watershed and culmination of modern philosophy; all subsequent major schools must respond to his system."
      }
    },
    { id: "ludwig_wittgenstein", name: "Ludwig Wittgenstein (路德维希·维特根斯坦)",
      contribution: {
        "zh-CN": "撰写《逻辑哲学论》《哲学研究》，革新语言哲学，提出语言游戏理论。",
        "en": "Authored Tractatus Logico-Philosophicus, Philosophical Investigations, revolutionized philosophy of language with language-game theory."
      },
      field: {
        "zh-CN": "语言哲学、分析哲学。",
        "en": "Philosophy of Language, Analytic Philosophy."
      },
      remarks: {
        "zh-CN": "20世纪最伟大哲学家之一，影响逻辑、AI与当代文化批评。",
        "en": "Among 20th century’s greatest philosophers, impacted logic, AI, and contemporary cultural critique."
      }
    },
    { id: "alfred_adler", name: "Alfred Adler (阿尔弗雷德·阿德勒)",
      contribution: {
        "zh-CN": "著有《自卑与超越》，创立个体心理学，探讨自卑补偿与社会兴趣。",
        "en": "Authored What Life Could Mean to You, founded individual psychology, explored inferiority compensation and social interest."
      },
      field: {
        "zh-CN": "心理学文学、自我超越。",
        "en": "Psychological Literature, Self-Transcendence."
      },
      remarks: {
        "zh-CN": "奥地利心理学巨擘，作品通俗化深刻影响现代励志与人文思想。",
        "en": "Austrian psychology titan, popularized works profoundly shaped modern motivational and humanistic thought."
      }
    },
    { id: "yuval_noah_harari", name: "Yuval Noah Harari (尤瓦尔·诺亚·赫拉利)",
      contribution: {
        "zh-CN": "著有《人类简史》《未来简史》，剖析人类历史、科技与伦理交汇，探讨信息网络与人工智能未来。",
        "en": "Authored Sapiens, Homo Deus, analyzed human history, technology, and ethics intersections, explored information networks and AI futures."
      },
      field: {
        "zh-CN": "历史学、未来主义、哲学。",
        "en": "History, Futurism, Philosophy."
      },
      remarks: {
        "zh-CN": "以色列历史学家与全球思想领袖，其简史系列销量逾5000万册，影响当代对人类命运的哲学反思。",
        "en": "Israeli historian and global thought leader, Sapiens series sold over 50 million copies, shaping contemporary philosophical reflections on human destiny."
      }
    },
    { id: "lars_tvede", name: "Lars Tvede (拉尔斯·特韦德)",
      contribution: {
        "zh-CN": "著有《超智能未来》，分析从宇宙起源到人工智能文明的智能演化，预测科技趋势对社会影响。",
        "en": "Authored Supertrends, analyzed intelligence evolution from cosmic origins to AI civilizations, predicted tech trends' societal impacts."
      },
      field: {
        "zh-CN": "未来学、科技创业。",
        "en": "Futurism, Tech Entrepreneurship."
      },
      remarks: {
        "zh-CN": "丹麦企业家与未来学家，创立多家高科技公司，其著作桥接创新投资与全球趋势预测。",
        "en": "Danish entrepreneur and futurist, founded multiple high-tech companies, works bridge innovation investment and global trend forecasting."
      }
    },
    { id: "robert_caro", name: "Robert Caro (罗伯特·卡罗)",
      contribution: {
        "zh-CN": "著有《权力掮客》与林登·约翰逊总统传记系列，以详尽档案研究揭示政治权力机制。",
        "en": "Authored The Power Broker and Lyndon B. Johnson biography series, revealed political power through exhaustive archival research."
      },
      field: {
        "zh-CN": "政治传记。",
        "en": "Political Biography."
      },
      remarks: {
        "zh-CN": "两度普利策奖得主，现代传记标杆，推动对权力结构的文学剖析。",
        "en": "Two-time Pulitzer Prize winner, modern biography benchmark, advanced literary analysis of power structures."
      }
    },
    { id: "walter_isaacson", name: "Walter Isaacson (沃尔特·艾萨克森)",
      contribution: {
        "zh-CN": "撰写《乔布斯传》《爱因斯坦传》，结合访谈与历史分析剖析创新天才的人生。",
        "en": "Wrote Steve Jobs and Einstein biographies, dissected innovative geniuses' lives through interviews and historical analysis."
      },
      field: {
        "zh-CN": "科技与科学传记。",
        "en": "Technology and Science Biography."
      },
      remarks: {
        "zh-CN": "当代传记大师，前CNN主编，其畅销作品桥接历史与现代创新。",
        "en": "Contemporary biography master, former CNN editor, bestsellers bridging history and modern innovation."
      }
    },
    { id: "cixin_liu", name: "刘慈欣 (Liu Cixin)",
      contribution: {
        "zh-CN": "创作《三体》系列，推动中国科幻文学，融合硬科幻与人文主题，探讨科技伦理与人类命运。",
        "en": "Authored The Three-Body Problem series, advanced Chinese science fiction, blended hard sci-fi with humanistic themes, explored technological ethics and human destiny."
      },
      field: {
        "zh-CN": "科幻小说。",
        "en": "Science Fiction Novel."
      },
      remarks: {
        "zh-CN": "中国当代科幻代表，获雨果奖，推动全球科幻文学发展。",
        "en": "Contemporary Chinese sci-fi representative, Hugo Award winner, advanced global science fiction literature."
      }
    },
    { id: "andy_weir", name: "Andy Weir (安迪·威尔)",
      contribution: {
        "zh-CN": "创作《火星救援》《海尔·玛丽计划》，以硬科幻风格融合生存冒险、科技细节与人文情感。",
        "en": "Authored The Martian and Project Hail Mary, blended hard sci-fi with survival adventure, technical details, and humanistic emotions."
      },
      field: {
        "zh-CN": "科幻小说。",
        "en": "Science Fiction Novel."
      },
      remarks: {
        "zh-CN": "当代美国科幻作家，推动科普式科幻文学，作品被成功改编为电影。",
        "en": "Contemporary American sci-fi author, advanced educational science fiction, works successfully adapted into films."
      }
    },
    { id: "li_bai", name: "李白 (Li Bai)",
      contribution: {
        "zh-CN": "创作《蜀道难》《将进酒》，浪漫主义巅峰，抒发豪迈情怀与自然意象。",
        "en": "Authored Shu Dao Nan and Jiang Jin Jiu, pinnacle of romanticism, expressed bold sentiments and natural imagery."
      },
      field: {
        "zh-CN": "浪漫主义诗歌。",
        "en": "Romantic Poetry."
      },
      remarks: {
        "zh-CN": "唐代诗仙，作品体现自由奔放精神，影响东亚诗歌传统。",
        "en": "Tang Dynasty Poet Immortal, works embody free-spirited essence, influenced East Asian poetic tradition."
      }
    },
    { id: "du_fu", name: "杜甫 (Du Fu)",
      contribution: {
        "zh-CN": "著有《春夜喜雨》《三吏》《三别》，现实主义典范，反映民生疾苦与家国情怀。",
        "en": "Wrote Spring Night Joyful Rain, Three Officials, Three Partings, realist exemplar, reflected people’s hardships and patriotic sentiment."
      },
      field: {
        "zh-CN": "现实主义诗歌。",
        "en": "Realist Poetry."
      },
      remarks: {
        "zh-CN": "唐代诗圣，深刻的社会关怀奠定中国古典诗歌现实主义基础。",
        "en": "Tang Dynasty Poet Sage, profound social concern established foundation of Chinese classical realist poetry."
      }
    },
    { id: "bai_juyi", name: "白居易 (Bai Juyi)",
      contribution: {
        "zh-CN": "创作《长恨歌》《琵琶行》，通俗叙事诗，关注社会现实与人性情感。",
        "en": "Authored Song of Everlasting Sorrow, Pipa Song, accessible narrative poetry, focused on social reality and human emotions."
      },
      field: {
        "zh-CN": "叙事诗歌、通俗文学。",
        "en": "Narrative Poetry, Popular Literature."
      },
      remarks: {
        "zh-CN": "唐代新乐府运动代表，推动诗歌平民化与社会批判功能。",
        "en": "Tang Dynasty New Yuefu representative, advanced poetry’s popularization and social critique."
      }
    },
    { id: "su_dongpo", name: "苏东坡 (Su Dongpo)",
      contribution: {
        "zh-CN": "撰写《水调歌头》《念奴娇·赤壁怀古》，豪放词风，融合哲理与旷达胸怀。",
        "en": "Wrote Shui Diao Ge Tou, Nian Nu Jiao: Chibi Nostalgia, bold ci poetry, blended philosophy and broad-mindedness."
      },
      field: {
        "zh-CN": "宋词、豪放派。",
        "en": "Song Ci Poetry, Bold Style."
      },
      remarks: {
        "zh-CN": "北宋文学巨匠，多才艺影响词体发展与文人生活美学。",
        "en": "Northern Song literary master, versatile talents shaped ci form and literati aesthetic life."
      }
    },
    { id: "sima_qian", name: "司马迁 (Si Maqian)",
      contribution: {
        "zh-CN": "撰写《史记》，开创中国纪传体史学，记录帝王与英雄生平。",
        "en": "Authored Records of the Grand Historian, pioneered Chinese biographical historiography, chronicled emperors and heroes."
      },
      field: {
        "zh-CN": "历史传记、史学。",
        "en": "Historical Biography, Historiography."
      },
      remarks: {
        "zh-CN": "中国史学之父，其叙事影响亚洲历史写作传统。",
        "en": "Father of Chinese historiography, narrative shaped Asian historical writing."
      }
    },
    { id: "sima_guang", name: "司马光 (Sima Guang)",
      contribution: {
        "zh-CN": "主持编纂《资治通鉴》，中国第一部编年体通史，以“鉴于往事，有资于治道”为修史宗旨。",
        "en": "Compiled Zizhi Tongjian (Comprehensive Mirror in Aid of Governance), China's first comprehensive chronological history, aiming to reflect on the past to aid in governance."
      },
      field: {
        "zh-CN": "历史传记、史学。",
        "en": "Historical Biography, Historiography."
      },
      remarks: {
        "zh-CN": "北宋史学家，与司马迁并称“两司马”，其著作被视为历代帝王必读教科书。",
        "en": "Northern Song historian, paired with Sima Qian as 'The Two Simas,' his work is considered a mandatory textbook for emperors."
      }
    },
    { id: "meng_sen", name: "孟森 (Meng Sen)",
      contribution: {
        "zh-CN": "撰写《明史讲义》，将现代史学方法与传统考据相结合，深刻剖析明清政治制度与历史脉络。",
        "en": "Authored Ming History Lectures, combined modern historical methods with traditional textual criticism, deeply analyzed Ming-Qing political systems and historical contexts."
      },
      field: {
        "zh-CN": "历史传记、史学。",
        "en": "Historical Biography, Historiography."
      },
      remarks: {
        "zh-CN": "近代明清史研究鼻祖，确立该领域学术范式，有“想懂明史，必先读孟森”之誉。",
        "en": "Progenitor of modern Ming-Qing history research, established academic paradigms, famed by the saying 'to understand Ming history, one must read Meng Sen first.'"
      }
    },
    { id: "cao_xueqin", name: "曹雪芹 (Cao Xueqin)",
      contribution: {
        "zh-CN": "创作《红楼梦》，历经十年增删五次，描绘封建社会衰落与家族兴衰，探索人性、爱情与社会批判。",
        "en": "Authored Dream of the Red Chamber, revised over ten years with five revisions, depicted the decline of feudal society and family fortunes, explored humanity, love, and social critique."
      },
      field: {
        "zh-CN": "古典小说、诗歌、绘画。",
        "en": "Classical Novel, Poetry, Painting."
      },
      remarks: {
        "zh-CN": "清代文学巨匠，中国古典文学巅峰之作，推动红学研究与文化传承。",
        "en": "Qing Dynasty literary master, pinnacle of Chinese classical literature, advanced Redology studies and cultural heritage."
      }
    },
    { id: "suetonius", name: "Suetonius (苏埃托尼乌斯)",
      contribution: {
        "zh-CN": "撰写《罗马十二帝王传》，记录罗马皇帝生平，揭示权力与人性。",
        "en": "Authored The Twelve Caesars, chronicled Roman emperors' lives, explored power and humanity."
      },
      field: {
        "zh-CN": "历史传记、罗马史。",
        "en": "Historical Biography, Roman History."
      },
      remarks: {
        "zh-CN": "罗马传记文学代表，影响欧洲历史与政治叙事。",
        "en": "Roman biography icon, influenced European historical and political narrative."
      }
    },
    {id: "frank_mclynn", name: "Frank McLynn (弗兰克·麦克林)",
      contribution: {
        "zh-CN": "撰写《拿破仑传》《成吉思汗：他的征服、帝国与遗产》等多部人物传记，刻画复杂领袖与探险家的生平与时代影响。",
        "en": "Authored acclaimed biographies including Napoleon: A Biography, Genghis Khan: His Conquests, His Empire, His Legacy: A Biography, portray complex leaders and explorers."
      },
      field: {
        "zh-CN": "历史传记、军事史、探险史。",
        "en": "Historical Biography, Military History, Exploration History."
      },
      remarks: {
        "zh-CN": "当代英国最具生产力的传记历史学家之一，以叙事张力与多学科视角著称，其作品兼顾学术深度与可读性，多次获专业评论肯定。",
        "en": "One of the most prolific contemporary British biographers and historians, renowned for narrative drive and multidisciplinary perspective; his works balance scholarly depth with readability and receive consistent critical acclaim."
      }
    },
    { id: "marco_polo", name: "Marco Polo (马可·波罗)",
      contribution: {
        "zh-CN": "撰写《马可波罗游记》，记录亚洲地理与文化，激发西方对东方的探索。",
        "en": "Authored The Travels of Marco Polo, documented Asian geography and culture, inspired Western exploration."
      },
      field: {
        "zh-CN": "地理传记、旅行文学。",
        "en": "Geographical Biography, Travel Literature."
      },
      remarks: {
        "zh-CN": "中世纪地理文学先驱，促进东西方文化交流。",
        "en": "Medieval geographical literature pioneer, fostered East-West cultural exchange."
      }
    },
    { id: "xu_xiake", name: "徐霞客 (Xu Xiake)",
      contribution: {
        "zh-CN": "撰写《徐霞客游记》，记录中国地理与风貌，奠定中国旅行文学基础。",
        "en": "Authored Xu Xiake's Travels, documented Chinese geography and landscapes, founded Chinese travel literature."
      },
      field: {
        "zh-CN": "地理传记、旅行文学。",
        "en": "Geographical Biography, Travel Literature."
      },
      remarks: {
        "zh-CN": "中国地理学与文学的先驱，影响后世自然与文化研究。",
        "en": "Pioneer of Chinese geography and literature, influenced natural and cultural studies."
      }
    },
    { id: "alexander_von_humboldt", name: "Alexander von Humboldt (亚历山大·冯·洪堡)",
      contribution: {
        "zh-CN": "撰写《宇宙》，记录美洲地理与自然，奠定现代地理学与生态学基础。",
        "en": "Authored Cosmos, documented American geography and nature, founded modern geography and ecology."
      },
      field: {
        "zh-CN": "地理传记、自然科学。",
        "en": "Geographical Biography, Natural Science."
      },
      remarks: {
        "zh-CN": "近代地理学之父，连接科学与文学的叙述方式。",
        "en": "Father of modern geography, linked science with literary narrative."
      }
    },
    { id: "oprah_winfrey", name: "Oprah Winfrey (奥普拉·温弗瑞)",
      contribution: {
        "zh-CN": "通过其标志性访谈节目，开创深度人文对话，探索人性、社会议题与个人成长。",
        "en": "Pioneered deep humanistic dialogue through her iconic talk show, exploring human nature, social issues, and personal growth."
      },
      field: {
        "zh-CN": "电视访谈、媒体、社会文化。",
        "en": "Television Interview, Media, Social Culture."
      },
      remarks: {
        "zh-CN": "全球最具影响力的访谈主持人之一，以共情力和真诚提问闻名，影响深远。",
        "en": "One of the world's most influential interviewers, renowned for empathy and authentic questioning, with profound impact."
      }
    },
    { id: "joe_rogan", name: "Joe Rogan (乔·罗根)",
      contribution: {
        "zh-CN": "通过其播客，与各领域嘉宾进行长时间、开放式对话，探讨科学、哲学、时事及多元观点。",
        "en": "Conducted long-form, open-ended conversations with guests across various fields on his podcast, exploring science, philosophy, current events, and diverse perspectives."
      },
      field: {
        "zh-CN": "播客、跨领域对话、媒体。",
        "en": "Podcast, Cross-Disciplinary Dialogue, Media."
      },
      remarks: {
        "zh-CN": "播客界最具影响力的声音之一，以好奇心和挑战传统思维著称，深受全球听众喜爱。",
        "en": "One of the most influential voices in podcasting, known for curiosity and challenging conventional thinking, popular with global audiences."
      }
    },
    { id: "ted_koppel", name: "Ted Koppel (泰德·科佩尔)",
      contribution: {
        "zh-CN": "作为资深新闻主持人，以尖锐、精准的提问，对政治人物和时事进行深度访谈和批判性审视。",
        "en": "As a veteran news anchor, conducted in-depth interviews and critical examinations of political figures and current events with sharp, precise questioning."
      },
      field: {
        "zh-CN": "新闻访谈、政治评论、时事。",
        "en": "News Interview, Political Commentary, Current Affairs."
      },
      remarks: {
        "zh-CN": "传统深度新闻访谈的标杆，以其严谨和挑战性提问维护新闻专业主义。",
        "en": "A benchmark for traditional in-depth news interviewing, upholding journalistic professionalism with rigorous and challenging questions."
      }
    },
    { id: "diane_sawyer", name: "Diane Sawyer (黛安·索耶)",
      contribution: {
        "zh-CN": "以其优雅、专业和富有同情心的访谈风格，挖掘新闻人物和普通人故事中的情感深度与人性。",
        "en": "With her elegant, professional, and empathetic interview style, she uncovered emotional depth and humanity in the stories of newsmakers and ordinary people."
      },
      field: {
        "zh-CN": "电视新闻、人文访谈、社会议题。",
        "en": "Television News, Human Interest Interview, Social Issues."
      },
      remarks: {
        "zh-CN": "备受尊敬的电视新闻记者和主持人，擅长处理敏感话题并传递故事的温度。",
        "en": "A highly respected television journalist and anchor, skilled at handling sensitive topics and conveying the warmth of stories."
      }
    },
    { id: "naval_ravikant", name: "Naval Ravikant (纳瓦尔·拉维坎特)",
      contribution: {
        "zh-CN": "通过播客、Twitter及《纳瓦尔宝典》系统阐述财富创造、幸福哲学与杠杆原理，将古代智慧与现代创业、科技投资相结合。",
        "en": "Through Podcast, Twitter , and The Almanack of Naval Ravikant, systematically articulated philosophies on wealth creation, happiness, and leverage, fusing ancient wisdom with modern entrepreneurship and technology investing."
      },
      field: {
        "zh-CN": "智慧文学、创业哲学、科技人文。",
        "en": "Wisdom Literature, Entrepreneurial Philosophy, Tech Humanism."
      },
      remarks: {
        "zh-CN": "当代最具影响力的思想企业家，其格言式表达被全球数百万读者奉为人生与事业指南，被誉为“硅谷哲学家”。",
        "en": "The most influential thinker-entrepreneur of our time; his aphoristic wisdom has become a life and career guide for millions worldwide, often called the 'Silicon Valley Philosopher'."
      }
    },
    { id: "lex_fridman", name: "Lex Fridman (莱克斯·弗里德曼)",
      contribution: {
        "zh-CN": "作为AI研究员和播客主持人，与顶尖科学家、思想家进行智性对话，深入探讨人工智能、哲学和意识的本质。",
        "en": "As an AI researcher and podcast host, engaged in intellectual dialogues with leading scientists and thinkers, delving into the essence of AI, philosophy, and consciousness."
      },
      field: {
        "zh-CN": "播客、人工智能、哲学、科学访谈。",
        "en": "Podcast, Artificial Intelligence, Philosophy, Science Interview."
      },
      remarks: {
        "zh-CN": "以其沉静、深邃的访谈风格著称，连接科技前沿与人类终极思考。",
        "en": "Known for his calm and profound interview style, connecting technological frontiers with ultimate human contemplation."
      }
    },
    { id: "ben_gilbert_david_rosenthal", name: "Ben Gilbert & David Rosenthal (本·吉尔伯特 & 大卫·罗森塔尔)",
      contribution: {
        "zh-CN": "通过《Acquired》播客，深度剖析全球顶尖科技公司和商业案例，提供无与伦比的行业洞察和战略思考。",
        "en": "Through the 'Acquired' podcast, they deeply dissected leading global tech companies and business cases, offering unparalleled industry insight and strategic thinking."
      },
      field: {
        "zh-CN": "播客、商业案例分析、科技、投资。",
        "en": "Podcast, Business Case Analysis, Technology, Investment."
      },
      remarks: {
        "zh-CN": "商业与科技播客领域的翘楚，以详尽研究和专业分析为听众提供宝贵知识。",
        "en": "Leaders in business and tech podcasting, providing valuable knowledge to listeners through exhaustive research and professional analysis."
      }
    },
    {id: "chamath_jason_sacks_friedberg", name: "Chamath, Jason, Sacks & Friedberg (查马斯, 杰森, 萨克斯 & 弗里德伯格)",
      contribution: {
        "zh-CN": "通过《All-In Podcast》，四位硅谷资深投资人与企业家以圆桌辩论形式，直率剖析科技趋势、宏观经济、政治政策与创业动态。",
        "en": "Through the 'All-In Podcast', four prominent Silicon Valley investors and entrepreneurs engage in roundtable debates, candidly analyzing tech trends, macroeconomics, politics, policy, and startup dynamics."
      },
      field: {
        "zh-CN": "播客、科技投资、宏观经济、政治。",
        "en": "Podcast, Technology Investment, Macroeconomics, Politics."
      },
      remarks: {
        "zh-CN": "硅谷精英圈最具代表性的多人辩论播客，以坦诚争论和深度内部洞见著称，已成为科技与政策交汇领域的重要参考窗口。",
        "en": "The most representative multi-host debate podcast in Silicon Valley circles, renowned for candid arguments and deep insider insights, serving as a key reference window at the intersection of technology and policy."
      }
    },
    {id: "peter_diamandis_dave_blundin", name: "Peter Diamandis & Dave Blundin (彼得·戴曼迪斯 & 戴夫·布伦丁)",
      contribution: {
        "zh-CN": "通过《Moonshots Podcast》，深度访谈前沿科技领袖，探讨AI、AGI、能源、长寿、丰裕时代等未来主义议题。",
        "en": "Through the 'Moonshots Podcast', conduct in-depth interviews with frontier technology leaders, exploring futurist topics such as AI, AGI, energy, longevity, and the era of abundance."
      },
      field: {
        "zh-CN": "播客、未来科技、指数级创新、能源。",
        "en": "Podcast, Future Technology, Exponential Innovation, Energy."
      },
      remarks: {
        "zh-CN": "以大胆未来愿景和顶尖嘉宾对话为核心，节目激励听众拥抱技术变革，已成为追踪指数级科技前沿与人类命运交汇的重要平台。",
        "en": "Centered on bold futurist visions and dialogues with top-tier guests, the podcast inspires listeners to embrace technological change and has become a key platform for tracking exponential tech frontiers and their intersection with humanity's future."
      }
    },
    {
      id: "david_macaulay", name: "David Macaulay (大卫·麦考利)",
      contribution: {
        "zh-CN": "创作《大教堂》《城堡》系列及《万物运转的秘密》，以精湛插图详尽再现建筑与机械建造过程，普及工程与科技原理。",
        "en": "Authored the Cathedral, Castle, Pyramid series and The Way Things Work, meticulously illustrated construction processes of architecture and machines, popularized engineering and scientific principles."
      },
      field: {
        "zh-CN": "建筑插图、科普图画书、工程教育。",
        "en": "Architectural Illustration, Educational Picture Books, Engineering Education."
      },
      remarks: {
        "zh-CN": "当代最杰出的科普插画家之一，2006年获麦克阿瑟天才奖，其作品以严谨细节与幽默视角影响全球数代读者对建筑与科技的认知。",
        "en": "One of the most distinguished contemporary educational illustrators; recipient of the 2006 MacArthur Fellowship; his works, with rigorous detail and wry humor, have shaped generations' understanding of architecture and technology worldwide."
      }
    }
];
