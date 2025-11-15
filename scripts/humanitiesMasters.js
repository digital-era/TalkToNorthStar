        const humanitiesMasters = [
            { id: "william_shakespeare", name: "William Shakespeare", 
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
            { id: "fyodor_dostoevsky", name: "Fyodor Dostoevsky", 
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
            { id: "leo_tolstoy", name: "Leo Tolstoy", 
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
            { id: "miguel_de_cervantes", name: "Miguel de Cervantes", 
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
            { id: "homer", name: "Homer", 
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
            { id: "charles_dickens", name: "Charles Dickens", 
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
           { id: "mikhail_sholokhov", name: "Mikhail Sholokhov",
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
            { id: "virginia_woolf", name: "Virginia Woolf", 
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
            { id: "ernest_hemingway", name: "Ernest Hemingway", 
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
            { id: "gabriel_garcia_marquez", name: "Gabriel García Márquez", 
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
            { id: "franz_kafka", name: "Franz Kafka", 
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
            { id: "plutarch", name: "Plutarch", 
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
            { id: "alfred_adler", name: "Alfred Adler", 
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
            { id: "ludwig_wittgenstein", name: "Ludwig Wittgenstein", 
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

            { id: "robert_caro", name: "Robert Caro",
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
           { id: "walter_isaacson", name: "Walter Isaacson",
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
           { id: "cixin_liu", name: "Cixin Liu",
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
             { id: "andy_weir", name: "Andy Weir",
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
            { id: "li_bai", name: "李白", 
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
            { id: "du_fu", name: "杜甫", 
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
            { id: "bai_juyi", name: "白居易", 
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
            { id: "su_dongpo", name: "Su Dongpo", 
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
            { id: "sima_qian", name: "司马迁", 
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
            { id: "suetonius", name: "Suetonius", 
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
            { id: "marco_polo", name: "Marco Polo", 
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
            { id: "xu_xiake", name: "徐霞客", 
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
            { id: "alexander_von_humboldt", name: "Alexander von Humboldt", 
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
            }
        ]; 
