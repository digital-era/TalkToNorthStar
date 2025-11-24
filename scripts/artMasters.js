       const artMasters = [
            { id: "leonardo_da_vinci", name: "Leonardo da Vinci", 
              contribution: {
                "zh-CN": "创作《蒙娜丽莎》《最后的晚餐》，革新透视法与解剖学绘画。",
                "en": "Created Mona Lisa, The Last Supper, revolutionized perspective and anatomical art."
              }, 
              field: {
                "zh-CN": "绘画、雕塑、跨学科艺术。",
                "en": "Painting, Sculpture, Interdisciplinary Art."
              }, 
              remarks: {
                "zh-CN": "文艺复兴全才，艺术与科学融合的先驱。",
                "en": "Renaissance polymath, pioneer of art-science integration."
              } 
            },
            { id: "michelangelo", name: "Michelangelo", 
              contribution: {
                "zh-CN": "创作《大卫》《西斯廷教堂天顶画》，推雕塑与壁画至巅峰。",
                "en": "Created David, Sistine Chapel frescoes, elevated sculpture and mural art."
              }, 
              field: {
                "zh-CN": "雕塑、绘画、建筑。",
                "en": "Sculpture, Painting, Architecture."
              }, 
              remarks: {
                "zh-CN": "文艺复兴巨匠，定义人体美学与宗教艺术。",
                "en": "Renaissance master, defined human aesthetics and religious art."
              } 
            },
            { id: "pablo_picasso", name: "Pablo Picasso", 
              contribution: {
                "zh-CN": "创立立体主义，创作《格尔尼卡》，革新现代艺术形式。",
                "en": "Founded Cubism, created Guernica, transformed modern art forms."
              }, 
              field: {
                "zh-CN": "绘画、雕塑、陶瓷。",
                "en": "Painting, Sculpture, Ceramics."
              }, 
              remarks: {
                "zh-CN": "20世纪艺术先锋，挑战传统美学界限。",
                "en": "20th-century art pioneer, challenged traditional aesthetics."
              } 
            },
            { id: "vincent_van_gogh", name: "Vincent van Gogh", 
              contribution: {
                "zh-CN": "创作《星夜》《向日葵》，以表现主义捕捉情感与自然。",
                "en": "Created The Starry Night, Sunflowers, captured emotion via expressionism."
              }, 
              field: {
                "zh-CN": "绘画、后印象主义。",
                "en": "Painting, Post-Impressionism."
              }, 
              remarks: {
                "zh-CN": "影响现代艺术情感表达，作品广受推崇。",
                "en": "Influenced modern emotional expression, works widely revered."
              } 
            },
            { id: "rembrandt_van_rijn", name: "Rembrandt van Rijn", 
              contribution: {
                "zh-CN": "创作《夜巡》，以光影与心理深度革新肖像画。",
                "en": "Created The Night Watch, revolutionized portraiture with light and depth."
              }, 
              field: {
                "zh-CN": "绘画、版画。",
                "en": "Painting, Printmaking."
              }, 
              remarks: {
                "zh-CN": "巴洛克艺术大师，奠定荷兰黄金时代画风。",
                "en": "Baroque art master, shaped Dutch Golden Age style."
              } 
            },
            { id: "claude_monet", name: "Claude Monet", 
              contribution: {
                "zh-CN": "创作《睡莲》《印象·日出》，开创印象主义画派。",
                "en": "Created Water Lilies, Impression: Sunrise, founded Impressionism."
              }, 
              field: {
                "zh-CN": "绘画、印象主义。",
                "en": "Painting, Impressionism."
              }, 
              remarks: {
                "zh-CN": "现代风景画先驱，影响户外写生传统。",
                "en": "Modern landscape painting pioneer, shaped plein air tradition."
              } 
            },
            { id: "raphael", name: "Raphael", 
              contribution: {
                "zh-CN": "创作《雅典学院》，以和谐构图推文艺复兴美学。",
                "en": "Created The School of Athens, advanced Renaissance aesthetics."
              }, 
              field: {
                "zh-CN": "绘画、壁画。",
                "en": "Painting, Fresco."
              }, 
              remarks: {
                "zh-CN": "文艺复兴三杰之一，定义古典美学标准。",
                "en": "Renaissance trio member, defined classical aesthetic standards."
              } 
            },
            { id: "andy_warhol", name: "Andy Warhol", 
              contribution: {
                "zh-CN": "创作《玛丽莲·梦露》《汤罐》，开创波普艺术运动。",
                "en": "Created Marilyn Monroe, Campbell’s Soup Cans, pioneered Pop Art."
              }, 
              field: {
                "zh-CN": "绘画、版画、电影。",
                "en": "Painting, Printmaking, Film."
              }, 
              remarks: {
                "zh-CN": "艺术与流行文化融合的20世纪代表。",
                "en": "20th-century icon merging art with popular culture."
              } 
            },
            { id: "gustav_klimt", name: "Gustav Klimt", 
              contribution: {
                "zh-CN": "创作《吻》，以装饰性风格融合象征主义艺术。",
                "en": "Created The Kiss, blended symbolism with decorative style."
              }, 
              field: {
                "zh-CN": "绘画、装饰艺术。",
                "en": "Painting, Decorative Art."
              }, 
              remarks: {
                "zh-CN": "奥地利艺术代表，影响新艺术运动。",
                "en": "Austrian art icon, influenced Art Nouveau movement."
              } 
            },
            { id: "frida_kahlo", name: "Frida Kahlo", 
              contribution: {
                "zh-CN": "创作《自画像》，以超现实主义表达痛苦与身份。",
                "en": "Created Self-Portraits, expressed pain and identity via surrealism."
              }, 
              field: {
                "zh-CN": "绘画、超现实主义。",
                "en": "Painting, Surrealism."
              }, 
              remarks: {
                "zh-CN": "墨西哥艺术象征，女性主义与民族先锋。",
                "en": "Mexican art icon, feminist and nationalist pioneer."
              } 
            },
            { id: "wolfgang_amadeus_mozart", name: "Wolfgang Amadeus Mozart", 
              contribution: {
                "zh-CN": "创作《魔笛》《安魂曲》，以钢琴协奏曲与歌剧革新古典音乐。",
                "en": "Composed The Magic Flute, Requiem, revolutionized classical music with piano concertos and operas."
              }, 
              field: {
                "zh-CN": "钢琴音乐、古典音乐、歌剧。",
                "en": "Piano Music, Classical Music, Opera."
              }, 
              remarks: {
                "zh-CN": "古典音乐天才，钢琴作品奠定音乐表现力基础。",
                "en": "Classical music genius, piano works foundational to musical expression."
              } 
            },
            { id: "ludwig_van_beethoven", name: "Ludwig van Beethoven", 
              contribution: {
                "zh-CN": "创作《月光奏鸣曲》《第九交响曲》，以钢琴与交响乐桥接古典与浪漫主义。",
                "en": "Composed Moonlight Sonata, Symphony No. 9, bridged Classical and Romanticism with piano and orchestral works."
              }, 
              field: {
                "zh-CN": "钢琴音乐、交响乐、古典音乐。",
                "en": "Piano Music, Symphony, Classical Music."
              }, 
              remarks: {
                "zh-CN": "音乐史上巨匠，钢琴作品推动情感深度表达。",
                "en": "Musical titan, piano works advanced emotional depth."
              } 
            },
            { id: "frederic_chopin", name: "Frédéric Chopin", 
              contribution: {
                "zh-CN": "创作《夜曲》《波兰舞曲》，以抒情钢琴曲定义浪漫主义音乐。",
                "en": "Composed Nocturnes, Polonaises, defined Romantic music with lyrical piano works."
              }, 
              field: {
                "zh-CN": "钢琴音乐、浪漫主义音乐。",
                "en": "Piano Music, Romantic Music."
              }, 
              remarks: {
                "zh-CN": "浪漫派钢琴大师，影响现代钢琴演奏技艺。",
                "en": "Romantic piano master, shaped modern piano technique."
              } 
            },

           { id: "paul_rand", name: "Paul Rand",
              contribution: {
                "zh-CN": "设计IBM、UPS等标志性标识与书籍海报，创立极简主义布局与视觉美学原则。",
                "en": "Designed iconic IBM, UPS logos and book posters, established minimalist layout and visual aesthetics principles."
              },
              field: {
                "zh-CN": "平面设计、品牌标识、布局美学。",
                "en": "Graphic Design, Branding, Layout Aesthetics."
              },
              remarks: {
                "zh-CN": "20世纪最伟大平面设计师，其不对称平衡与负空间理论影响当代UI与封面设计。",
                "en": "Greatest 20th-century graphic designer; asymmetric balance and negative space theory shaped modern UI and cover design."
              }
            },
            { id: "chip_kidd", name: "Chip Kidd",
              contribution: {
                "zh-CN": "设计《侏罗纪公园》等2000+书籍封面，融合概念隐喻与大胆排版，革新当代封面叙事美感。",
                "en": "Designed 2000+ book covers including Jurassic Park, blending conceptual metaphors with bold typography, revolutionized contemporary cover narrative aesthetics."
              },
              field: {
                "zh-CN": "书籍封面设计、平面叙事。",
                "en": "Book Cover Design, Graphic Narrative."
              },
              remarks: {
                "zh-CN": "在世最著名书籍封面大师，其创意深刻影响全球出版视觉文化。",
                "en": "World's most famous living book cover designer; creativity profoundly influenced global publishing visual culture."
              }
            },
            { id: "jonathan_ive", name: "Jonathan Ive",
              contribution: {
                "zh-CN": "主导iPhone、iPad等界面设计，开创扁平化触控UI与沉浸式布局美学。",
                "en": "Led iPhone, iPad interface designs, pioneered flat touch UI and immersive layout aesthetics."
              },
              field: {
                "zh-CN": "数字界面设计、UI/UX。",
                "en": "Digital Interface Design, UI/UX."
              },
              remarks: {
                "zh-CN": "苹果前首席设计官，其极简交互美学定义21世纪全球数字界面标准。",
                "en": "Former Apple Chief Design Officer; minimalist interaction aesthetics defined 21st-century global digital interface standards."
              }
            },
            { id: "coco_chanel", name: "Coco Chanel",
              contribution: {
                "zh-CN": "发明小黑裙与香奈儿套装，解放女性着装，开创现代简约奢华美学。",
                "en": "Invented the little black dress and Chanel suit, liberated women's fashion, pioneered modern minimalist luxury aesthetics."
              },
              field: {
                "zh-CN": "高级时装、现代时尚。",
                "en": "Haute Couture, Modern Fashion."
              },
              remarks: {
                "zh-CN": "20世纪最伟大时尚设计师，永恒定义女性优雅与实用主义，影响全球奢侈品百年。",
                "en": "Greatest fashion designer of the 20th century; eternally defined feminine elegance and pragmatism, influencing global luxury for a century."
              }
            },
            { id: "iris_van_herpen", name: "Iris van Herpen",
              contribution: {
                "zh-CN": "融合3D打印、激光切割与生物科技，开创科技高定与赛博未来主义时尚。",
                "en": "Integrated 3D printing, laser cutting, and biotechnology, pioneered tech couture and cyber-futuristic fashion."
              },
              field: {
                "zh-CN": "科技时尚、赛博高定。",
                "en": "Technology Fashion, Cyber Couture."
              },
              remarks: {
                "zh-CN": "当代最革命性设计师，其人与科技融合美学定义21世纪赛博时尚，影响全球未来主义潮流。",
                "en": "Most revolutionary contemporary designer; human-tech fusion aesthetics define 21st-century cyber fashion, influencing global futurism trends."
              }
            },
           { id: "henri_cartier_bresson", name: "Henri Cartier-Bresson",
              contribution: {
                "zh-CN": "创立“决定性瞬间”理论，奠定街头摄影与新闻摄影美学准则，创办马格南图片社。",
                "en": "Founded the 'Decisive Moment' theory, established street and photojournalism aesthetics, co-founded Magnum Photos."
              },
              field: {
                "zh-CN": "街头摄影、新闻摄影、人文纪实。",
                "en": "Street Photography, Photojournalism, Humanistic Documentary."
              },
              remarks: {
                "zh-CN": "现代摄影之父，其几何构图与瞬间抓拍原则影响20-21世纪所有摄影师，被尊为摄影史上最伟大人物。",
                "en": "Father of modern photography; geometric composition and decisive moment principles shaped every photographer of the 20-21st centuries."
              }
            },
            { id: "annie_leibovitz", name: "Annie Leibovitz",
              contribution: {
                "zh-CN": "拍摄约翰·列侬与小野洋子、怀孕黛米·摩尔等世纪肖像，将戏剧化布光与叙事观念引入名人摄影。",
                "en": "Captured iconic portraits of John Lennon & Yoko Ono, pregnant Demi Moore; introduced dramatic lighting and conceptual narrative to celebrity portraiture."
              },
              field: {
                "zh-CN": "肖像摄影、时尚摄影、观念摄影。",
                "en": "Portrait Photography, Fashion Photography, Conceptual Photography."
              },
              remarks: {
                "zh-CN": "在世最伟大肖像摄影师，其作品定义当代名人影像文化与杂志封面美学，商业与艺术价值巅峰。",
                "en": "Greatest living portrait photographer; works define contemporary celebrity visual culture and magazine cover aesthetics, peak of commercial-art fusion."
              }
            },
            { id: "frank_lloyd_wright", name: "Frank Lloyd Wright",
              contribution: {
                "zh-CN": "创作《流水别墅》《古根海姆博物馆》，开创有机建筑理念，强调人与自然和谐共生。",
                "en": "Authored Fallingwater and Guggenheim Museum, pioneered organic architecture emphasizing harmony between human and nature."
              },
              field: {
                "zh-CN": "有机建筑、现代主义。",
                "en": "Organic Architecture, Modernism."
              },
              remarks: {
                "zh-CN": "20世纪最伟大建筑师，其草原式住宅与流动空间理论影响全球当代可持续设计。",
                "en": "Greatest architect of the 20th century; Prairie School and flowing spaces theory shaped global contemporary sustainable design."
              }
            },
            { id: "le_corbusier", name: "Le Corbusier",
              contribution: {
                "zh-CN": "提出新建筑五点与光辉城市理论，设计《萨伏伊别墅》《昌迪加尔规划》。",
                "en": "Proposed Five Points of Architecture and Radiant City, designed Villa Savoye and Chandigarh."
              },
              field: {
                "zh-CN": "现代主义、城市规划。",
                "en": "Modernism, Urban Planning."
              },
              remarks: {
                "zh-CN": "现代建筑之父，17项作品入选UNESCO，其功能主义与国际风格定义20世纪城市面貌。",
                "en": "Father of modern architecture; 17 UNESCO sites, functionalism and International Style defined 20th-century urbanism."
              }
            },
            { id: "zaha_hadid", name: "Zaha Hadid",
              contribution: {
                "zh-CN": "创作《海达尔·阿里耶夫中心》《北京大兴机场》，开创参数化流动形态与解构主义当代建筑。",
                "en": "Authored Heydar Aliyev Center and Beijing Daxing Airport, pioneered parametric fluid forms and deconstructivist contemporary architecture."
              },
              field: {
                "zh-CN": "参数化建筑、解构主义。",
                "en": "Parametric Architecture, Deconstructivism."
              },
              remarks: {
                "zh-CN": "首位普利兹克奖女性得主，其未来主义曲线语言重塑21世纪全球地标与数字设计范式。",
                "en": "First female Pritzker laureate; futuristic curves reshaped 21st-century global landmarks and digital design paradigms."
              }
            },
            { id: "liu_jiakun", name: "刘家琨 (Liu Jiakun)",
              contribution: {
                "zh-CN": "创作《西村大院》《苏州御窑砖博物馆》，以日常性与社区活力为核心，融合中国文脉与当代功能。",
                "en": "Authored West Village and Suzhou Imperial Kiln Museum, centering everyday life and community vitality while integrating Chinese context with contemporary function."
              },
              field: {
                "zh-CN": "当代中国建筑、社会性文脉主义。",
                "en": "Contemporary Chinese Architecture, Social Contextualism."
              },
              remarks: {
                "zh-CN": "2025年普利兹克建筑奖得主，其作品庆祝普通人生活，被誉为当下最具影响力的在世建筑大师。",
                "en": "2025 Pritzker Prize laureate; works celebrate ordinary lives, recognized as the most influential living architect today."
              }
            },
            { id: "martin_scorsese", name: "Martin Scorsese",
                contribution: {
                "zh-CN": "执导《好家伙》《无间道风云》，探索犯罪、救赎与美国社会主题。",
                "en": "Directed Goodfellas, The Departed, explored crime, redemption, and American society themes."
                },
                field: {
                "zh-CN": "电影导演、犯罪剧、剧情片。",
                "en": "Film Direction, Crime Drama, Drama."
                },
                remarks: {
                "zh-CN": "当代好莱坞大师，塑造现代电影叙事与动态剪辑。",
                "en": "Contemporary Hollywood master, shaped modern cinematic narrative and dynamic editing."
                }
            },
            { id: "christopher_nolan", name: "Christopher Nolan",
                contribution: {
                "zh-CN": "执导《奥本海默》《盗梦空间》，以复杂情节与视觉效果革新叙事。",
                "en": "Directed Oppenheimer, Inception, revolutionized narratives with complex plots and visual effects."
                },
                field: {
                "zh-CN": "电影导演、科幻片、剧情片。",
                "en": "Film Direction, Science Fiction, Drama."
                },
                remarks: {
                "zh-CN": "当代电影创新者，推动时间弯曲与哲学主题。",
                "en": "Contemporary film innovator, advanced time-bending and philosophical themes."
                }
            },
            { id: "steven_spielberg", name: "Steven Spielberg",
                contribution: {
                "zh-CN": "执导《大白鲨》《辛德勒的名单》，融合商业成功与情感深度。",
                "en": "Directed Jaws, Schindler's List, blended commercial success with emotional depth."
                },
                field: {
                "zh-CN": "电影导演、冒险片、历史剧。",
                "en": "Film Direction, Adventure, Historical Drama."
                },
                remarks: {
                "zh-CN": "好莱坞大片先驱，影响全球电影工业。",
                "en": "Hollywood blockbuster pioneer, influenced global film industry."
                }
            },
            { id: "james_cameron", name: "James Cameron",
                contribution: {
                "zh-CN": "执导《阿凡达》《泰坦尼克号》，以革命性视觉效果与3D技术革新电影。",
                "en": "Directed Avatar, Titanic, revolutionized cinema with groundbreaking visual effects and 3D technology."
                },
                field: {
                 "zh-CN": "电影导演、科幻片、动作片。",
                 "en": "Film Direction, Science Fiction, Action."
                },
                remarks: {
                 "zh-CN": "视觉特效先驱，推动全球票房纪录与沉浸式体验。",
                 "en": "Visual effects pioneer, drove global box office records and immersive experiences."
                }
           },
           { id: "quentin_tarantino", name: "Quentin Tarantino",
                contribution: {
                "zh-CN": "执导《低俗小说》《好莱坞往事》，以非线性叙事与流行文化革新独立电影。",
                "en": "Directed Pulp Fiction, Once Upon a Time in Hollywood, revolutionized indie cinema with nonlinear narratives and pop culture."
                },
                field: {
                "zh-CN": "电影导演、犯罪剧、喜剧片。",
                "en": "Film Direction, Crime Drama, Comedy."
                },
                remarks: {
                "zh-CN": "当代风格化导演，重塑对话与暴力美学。",
                "en": "Contemporary stylized director, reshaped dialogue and violence aesthetics."
                }
            },
            { id: "david_fincher", name: "David Fincher",
                contribution: {
                "zh-CN": "执导《七宗罪》《搏击俱乐部》，以心理惊悚片探索人性黑暗面。",
                "en": "Directed Se7en, Fight Club, explored human darkness in psychological thrillers."
                },
                field: {
                "zh-CN": "电影导演、惊悚片、剧情片。",
                "en": "Film Direction, Thriller, Drama."
                },
                remarks: {
                "zh-CN": "当代惊悚大师，影响数字电影制作。",
                "en": "Contemporary thriller master, influenced digital filmmaking."
                }
            },
            { id: "denis_villeneuve", name: "Denis Villeneuve",
                contribution: {
                "zh-CN": "执导《沙丘》《银翼杀手2049》，以宏大叙事革新科幻电影。",
                "en": "Directed Dune, Blade Runner 2049, revolutionized sci-fi with epic narratives."
                },
                field: {
                "zh-CN": "电影导演、科幻片、剧情片。",
                "en": "Film Direction, Science Fiction, Drama."
                },
                remarks: {
                "zh-CN": "当代科幻巨匠，推动视觉与故事深度融合。",
                "en": "Contemporary sci-fi giant, advanced visual and narrative depth integration."
                }
            },
            { id: "james_horner", name: "James Horner",
             contribution: {
               "zh-CN": "创作《泰坦尼克号》《阿凡达》《勇敢的心》配乐，以宏大交响与民族乐器融合，开创现代史诗电影音乐典范。",
               "en": "Composed Titanic, Avatar, Braveheart scores, pioneered modern epic film music through grand orchestral and ethnic instrument fusion."
             },
             field: {
               "zh-CN": "电影配乐、交响乐、民族音乐融合。",
               "en": "Film Score, Symphonic Music, Ethnic Fusion."
             },
             remarks: {
               "zh-CN": "好莱坞史上最伟大的电影配乐大师之一，用旋律书写人类情感，直击人心。",
               "en": "One of the greatest film composers in Hollywood history; Composing human emotions through melody, heart-piercing melodies."
             }
            },
            { id: "john_williams", name: "John Williams",
              contribution: {
              "zh-CN": "创作《星球大战》《印第安纳·琼斯》《大白鲨》《哈利·波特》系列配乐，以宏大的管弦乐主题曲革新电影音乐。",
              "en": "Composed Star Wars, Indiana Jones, Jaws, Harry Potter series scores, revolutionized film music with grand orchestral themes."
              },
              field: {
              "zh-CN": "电影配乐、管弦乐、古典融合。",
              "en": "Film Score, Orchestral Music, Classical Fusion."
              },
              remarks: {
              "zh-CN": "当代最杰出的电影作曲家，获得5项奥斯卡奖，对全球电影配乐产生持久影响。",
              "en": "One of the most acclaimed film composers, winner of 5 Oscars, enduring impact on global film scoring."
              }
              },
              { id: "hans_zimmer", name: "Hans Zimmer",
              contribution: {
              "zh-CN": "创作《盗梦空间》《黑暗骑士》《狮子王》《沙丘》配乐，将电子与传统乐器结合，创造沉浸式音乐体验。",
              "en": "Composed Inception, The Dark Knight, The Lion King, Dune scores, blended electronic and traditional instruments for immersive experiences."
              },
              field: {
              "zh-CN": "电影配乐、电子音乐、交响融合。",
              "en": "Film Score, Electronic Music, Symphonic Fusion."
              },
              remarks: {
              "zh-CN": "德国作曲家，获得4项奥斯卡奖，推动电影配乐技术进步，影响当代流行与游戏音乐。",
              "en": "German composer, 4-time Oscar winner, advanced film scoring technology, influenced contemporary pop and game music."
              }
            },
            { id: "meryl_streep", name: "Meryl Streep",
                contribution: {
                "zh-CN": "出演《苏菲的选择》《穿普拉达的女王》，以多变角色展现演技深度。",
                "en": "Starred in Sophie's Choice, The Devil Wears Prada, showcased depth with versatile roles."
                },
                field: {
                "zh-CN": "电影表演、剧情片、喜剧片。",
                "en": "Film Acting, Drama, Comedy."
                },
                remarks: {
                "zh-CN": "奥斯卡最多提名演员，推动女性角色多样性。",
                "en": "Most Oscar-nominated actor, advanced diversity in female roles."
                }
            },
            { id: "denzel_washington", name: "Denzel Washington",
                contribution: {
                "zh-CN": "出演《训练日》《藩篱》，以强大表演探索道德与种族主题。",
                "en": "Starred in Training Day, Fences, explored morality and race with powerful performances."
                },
                field: {
                "zh-CN": "电影表演、剧情片、舞台剧。",
                "en": "Film Acting, Drama, Theater."
                },
                remarks: {
                "zh-CN": "当代表演巨星，影响好莱坞多样性代表。",
                "en": "Contemporary acting icon, influenced Hollywood diversity representation."
                }
            },
            { id: "leonardo_dicaprio", name: "Leonardo DiCaprio",
                contribution: {
                "zh-CN": "出演《荒野猎人》《盗梦空间》，以环境主题与深度角色著称。",
                "en": "Starred in The Revenant, Inception, known for environmental themes and deep roles."
                },
                field: {
                "zh-CN": "电影表演、剧情片、冒险片。",
                "en": "Film Acting, Drama, Adventure."
                },
                remarks: {
                "zh-CN": "当代明星，推动电影中社会议题探讨。",
                "en": "Contemporary star, advanced social issues in film."
                }
            },
            { id: "tom_hanks", name: "Tom Hanks",
                contribution: {
                "zh-CN": "出演《阿甘正传》《荒岛余生》，以亲和力角色展现人性。",
                "en": "Starred in Forrest Gump, Cast Away, showcased humanity with relatable roles."
                },
                field: {
                "zh-CN": "电影表演、剧情片、喜剧片。",
                "en": "Film Acting, Drama, Comedy."
                },
                remarks: {
                "zh-CN": "好莱坞常青树，定义大众英雄形象。",
                "en": "Hollywood evergreen, defined everyman hero imagery."
                }
            },
            { id: "robert_de_niro", name: "Robert De Niro",
                contribution: {
                "zh-CN": "出演《愤怒的公牛》《教父2》，以方法派演技沉浸角色。",
                "en": "Starred in Raging Bull, The Godfather Part II, immersed in roles via method acting."
                },
                field: {
                "zh-CN": "电影表演、剧情片、犯罪剧。",
                "en": "Film Acting, Drama, Crime Drama."
                },
                remarks: {
                "zh-CN": "表演传奇，影响当代演员深度。",
                "en": "Acting legend, influenced contemporary performer depth."
                }
            },
            { id: "brad_pitt", name: "Brad Pitt",
                contribution: {
                "zh-CN": "出演《搏击俱乐部》《好莱坞往事》，以魅力与多变角色著称。",
                "en": "Starred in Fight Club, Once Upon a Time in Hollywood, known for charisma and versatile roles."
                },
                field: {
                "zh-CN": "电影表演、剧情片、动作片。",
                "en": "Film Acting, Drama, Action."
                },
                remarks: {
                "zh-CN": "当代巨星，推动电影制作与表演融合。",
                "en": "Contemporary superstar, advanced film production and acting integration."
                }
            },
            { id: "joel_robuchon", name: "Joël Robuchon",
              contribution: {
                "zh-CN": "创作传奇土豆泥，主张回归食材本味，生涯累计32颗米其林星创历史纪录。",
                "en": "Created legendary Pommes Purée, advocated ingredient purity, held historical record of 32 Michelin stars."
              },
              field: {
                "zh-CN": "法式料理、高级餐饮。",
                "en": "French Cuisine, Fine Dining."
              },
              remarks: {
                "zh-CN": "被誉为“世纪名厨”，以极致完美主义重新定义法餐标准，影响力居全球之首。",
                "en": "Hailed as 'Chef of the Century'; redefined French standards with extreme perfectionism, holding top global influence."
              }
            },
            { id: "alain_ducasse", name: "Alain Ducasse",
              contribution: {
                "zh-CN": "首位在三城拥有米其林三星的主厨，建立全球餐饮帝国，推崇“自然本质”烹饪哲学。",
                "en": "First chef with 3-star restaurants in three cities, built global dining empire, championed 'Naturalness' culinary philosophy."
              },
              field: {
                "zh-CN": "法式高级料理、烹饪教育。",
                "en": "Haute Cuisine, Culinary Education."
              },
              remarks: {
                "zh-CN": "法餐教父，现役摘星最多厨师，其严谨哲学代表了高级料理的最高规格。",
                "en": "Godfather of French cuisine; holding most active stars, his rigorous philosophy represents the pinnacle of Haute Cuisine."
              }
            },
            { id: "gordon_ramsay", name: "Gordon Ramsay",
              contribution: {
                "zh-CN": "伦敦旗舰店保持三星超20年，通过《地狱厨房》将精湛厨艺与现代商业传媒完美结合。",
                "en": "Maintained 3 stars at London flagship for 20+ years, merged culinary mastery with modern media via Hell's Kitchen."
              },
              field: {
                "zh-CN": "现代欧陆菜、餐饮管理。",
                "en": "Modern European Cuisine, Restaurant Management."
              },
              remarks: {
                "zh-CN": "全球知名度最高主厨，以精准纪律与商业成就树立当代跨界名厨标杆。",
                "en": "World's most famous chef; established the benchmark for contemporary crossover chefs through precision and commercial success."
              }
            },
            { id: "shigeru_miyamoto", name: "Shigeru Miyamoto",
                contribution: {
                "zh-CN": "创作《马里奥》《塞尔达传说》，确立平台跳跃与3D动作游戏标准。",
                "en": "Created Mario, The Legend of Zelda, established standards for platformers and 3D action games."
                },
                field: {
                "zh-CN": "游戏设计、电子游戏。",
                "en": "Game Design, Video Games."
                },
                remarks: {
                "zh-CN": "现代电子游戏之父，强调直觉乐趣，定义了任天堂的设计哲学。",
                "en": "Father of modern video games; emphasized intuitive fun and defined Nintendo's design philosophy."
                }
            },
            { id: "hideo_kojima", name: "Hideo Kojima",
                contribution: {
                "zh-CN": "创作《合金装备》《死亡搁浅》，开创战术潜行类别与电影化叙事。",
                "en": "Created Metal Gear, Death Stranding, pioneered tactical stealth genre and cinematic narrative."
                },
                field: {
                "zh-CN": "游戏导演、互动电影。",
                "en": "Game Direction, Interactive Cinema."
                },
                remarks: {
                "zh-CN": "游戏界作者导演先驱，融合反战哲学与第九艺术表达。",
                "en": "Pioneer of auteur game direction; fused anti-war philosophy with Ninth Art expression."
                }
            },
            { id: "sid_meier", name: "Sid Meier",
                contribution: {
                "zh-CN": "创作《文明》系列，奠定4X策略游戏基础与历史模拟机制。",
                "en": "Created Civilization series, laid foundations for 4X strategy games and historical simulation."
                },
                field: {
                "zh-CN": "策略游戏、模拟。",
                "en": "Strategy Games, Simulation."
                },
                remarks: {
                "zh-CN": "策略游戏教父，提出“游戏是一系列有趣选择”的经典理论。",
                "en": "Godfather of strategy games; famously defined games as 'a series of interesting decisions'."
                }
            },
            { id: "john_carmack", name: "John Carmack",
                contribution: {
                "zh-CN": "开发《毁灭战士》《雷神之锤》，革新FPS玩法与3D图形引擎技术。",
                "en": "Developed Doom, Quake, revolutionized FPS gameplay and 3D graphics engine technology."
                },
                field: {
                "zh-CN": "游戏编程、图形引擎。",
                "en": "Game Programming, Graphics Engines."
                },
                remarks: {
                "zh-CN": "FPS之父与技术极客，以代码一己之力推动3D游戏时代到来。",
                "en": "Father of FPS and tech visionary; single-handedly drove the arrival of the 3D gaming era."
                }
            },
            { id: "hidetaka_miyazaki", name: "Hidetaka Miyazaki",
                contribution: {
                "zh-CN": "创作《黑暗之魂》《艾尔登法环》，开创“魂类”流派与碎片化叙事。",
                "en": "Created Dark Souls, Elden Ring, established 'Soulslike' genre and fragmented storytelling."
                },
                field: {
                "zh-CN": "动作角色扮演、暗黑奇幻。",
                "en": "Action RPG, Dark Fantasy."
                },
                remarks: {
                "zh-CN": "当代游戏美学大师，重塑高难度挑战与箱庭世界设计。",
                "en": "Master of contemporary game aesthetics; reshaped high-difficulty challenges and world design."
                }
            }, 
            { id: "luciano_pavarotti", name: "Luciano Pavarotti", 
              contribution: {
                "zh-CN": "意大利男高音，演唱《今夜无人入睡》，推广歌剧大众化，获格莱美奖。",
                "en": "Italian tenor, performed Nessun Dorma, popularized opera, Grammy winner."
              }, 
              field: {
                "zh-CN": "声乐、歌剧。",
                "en": "Vocal Music, Opera."
              }, 
              remarks: {
                "zh-CN": "20世纪歌剧巨星，推动古典声乐全球传播。",
                "en": "20th-century opera superstar, globalized classical vocal music."
              } 
            },
            { id: "maria_callas", name: "Maria Callas", 
              contribution: {
                "zh-CN": "希腊裔女高音，诠释贝利尼与威尔第角色，革新歌剧表演艺术。",
                "en": "Greek-American soprano, interpreted Bellini and Verdi roles, revolutionized opera performance."
              }, 
              field: {
                "zh-CN": "声乐、歌剧。",
                "en": "Vocal Music, Opera."
              }, 
              remarks: {
                "zh-CN": "被誉为“歌剧女王”，影响声乐技巧与戏剧性。",
                "en": "Dubbed 'La Divina,' influenced vocal technique and drama."
              } 
            },
            { id: "enrico_caruso", name: "Enrico Caruso", 
              contribution: {
                "zh-CN": "意大利男高音，先驱唱片录音，推动歌剧商业化与技术传播。",
                "en": "Italian tenor, pioneered recordings, advanced opera commercialization and technology."
              }, 
              field: {
                "zh-CN": "声乐、歌剧。",
                "en": "Vocal Music, Opera."
              }, 
              remarks: {
                "zh-CN": "早期录音时代传奇，奠定现代演唱基础。",
                "en": "Recording era legend, foundational to modern singing."
              } 
            }
        ];       
