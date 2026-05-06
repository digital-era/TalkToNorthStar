const chinaEntrepreneurs = [
            { id: "robin_zeng", name: "曾毓群 (Robin Zeng)", 
              contribution: {
                "zh-CN": "宁德时代（CATL）创始人兼董事长，领导全球最大电动车电池制造商，开发Shenxing超快充电电池，市场份额约38%。",
                "en": "Founder and Chairman of Contemporary Amperex Technology Co. Limited (CATL), leads the world's largest EV battery manufacturer, developed Shenxing ultra-fast charging batteries, with approximately 38% market share."
              }, 
              field: {
                "zh-CN": "新能源、电动车电池、能源存储。",
                "en": "New Energy, EV Batteries, Energy Storage."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，与特斯拉、宝马等合作，香港上市融资46亿美元，个人财富超730亿美元。",
                "en": "Attended the 2025 Private Enterprise Symposium, collaborated with Tesla and BMW, raised $4.6 billion through Hong Kong listing, personal wealth over $73 billion."
              } 
            },
            { id: "wang_chuanfu", name: "王传福 (Wang Chuanfu)", 
              contribution: {
                "zh-CN": "比亚迪（BYD）创始人兼董事长，打造全球第四大电动车及电池制造商，推动刀片电池和智能驾驶技术。",
                "en": "Founder and Chairman of BYD, built the world's fourth-largest EV and battery manufacturer, advancing Blade Battery and intelligent driving technology."
              }, 
              field: {
                "zh-CN": "电动车、新能源、电池技术。",
                "en": "Electric Vehicles, New Energy, Battery Technology."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，比亚迪2024年电池市场份额17.2%，挑战特斯拉，个人财富约203亿美元。",
                "en": "Attended the 2025 Private Enterprise Symposium, BYD held 17.2% battery market share in 2024, challenging Tesla, personal wealth approx. $20.3 billion."
              } 
            },
            { id: "fang_hongbo", name: "方洪波 (Fang Hongbo)", 
              contribution: {
                "zh-CN": "美的集团（Midea）董事长兼总裁，带领美的成为全球家电巨头，推进智能制造和机器人技术，2024年香港上市融资46亿美元。",
                "en": "Chairman and President of Midea Group, led Midea to become a global home appliance giant, advanced intelligent manufacturing and robotics technology, raised $4.6 billion through Hong Kong listing in 2024."
              }, 
              field: {
                "zh-CN": "家电制造、智能制造、机器人技术。",
                "en": "Home Appliance Manufacturing, Smart Manufacturing, Robotics."
              }, 
              remarks: {
                "zh-CN": "美的营收405亿美元，全球布局200+国家。",
                "en": "Midea's revenue is $40.5 billion, with a global presence in over 200 countries."
              } 
            },
            { id: "jack_ma", name: "马云 (Jack Ma)", 
              contribution: {
                "zh-CN": "阿里巴巴联合创始人，推动电商、云计算和数字支付革命，创立云峰资本支持创业创新。",
                "en": "Co-founder of Alibaba, propelled e-commerce, cloud computing, and digital payment revolutions, established Yunfeng Capital to support entrepreneurship and innovation."
              }, 
              field: {
                "zh-CN": "电子商务、云计算、投资。",
                "en": "E-commerce, Cloud Computing, Investment."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，持阿里巴巴3.8%股份，通过云峰资本影响科技与金融，个人财富251亿美元。",
                "en": "Attended the 2025 Private Enterprise Symposium, holds 3.8% stake in Alibaba, influences tech and finance through Yunfeng Capital, personal wealth $25.1 billion."
              } 
            },
            { id: "pony_ma", name: "马化腾 (Pony Ma)", 
              contribution: {
                "zh-CN": "腾讯董事会主席兼首席执行官，打造微信和QQ，领导游戏、社交和云计算领域全球扩张。",
                "en": "Chairman and CEO of Tencent, built WeChat and QQ, leads global expansion in gaming, social media, and cloud computing."
              }, 
              field: {
                "zh-CN": "互联网、社交媒体、云计算。",
                "en": "Internet, Social Media, Cloud Computing."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，腾讯2024年营收超800亿美元，推动中国科技全球化。",
                "en": "Attended the 2025 Private Enterprise Symposium, Tencent's 2024 revenue exceeded $80 billion, driving China's tech globalization."
              } 
            },
            { id: "zhang_yiming", name: "张一鸣 (Zhang Yiming)", 
              contribution: {
                "zh-CN": "字节跳动（ByteDance）创始人，开发TikTok和抖音，推动短视频和人工智能算法全球革命，领导内容推荐技术创新。",
                "en": "Founder of ByteDance, developed TikTok and Douyin, propelled global short-video and AI algorithm revolutions, leading innovations in content recommendation technology."
              }, 
              field: {
                "zh-CN": "互联网、短视频、人工智能。",
                "en": "Internet, Short Video, Artificial Intelligence."
              }, 
              remarks: {
                "zh-CN": "字节跳动2024年营收约1200亿美元，TikTok全球用户超17亿，推动数字娱乐全球化，个人财富约435亿美元。",
                "en": "ByteDance's 2024 revenue approximately $120 billion, TikTok has over 1.7 billion global users, driving digital entertainment globalization, personal wealth approx. $43.5 billion."
              } 
            },
            { id: "lei_jun", name: "雷军 (Lei Jun)", 
              contribution: {
                "zh-CN": "小米集团创始人兼首席执行官，引领智能手机和智能硬件生态，推进电动车业务（小米SU7）。",
                "en": "Founder and CEO of Xiaomi Group, leads smartphone and smart hardware ecosystem, advancing EV business (Xiaomi SU7)."
              }, 
              field: {
                "zh-CN": "智能手机、电动车、物联网。",
                "en": "Smartphones, Electric Vehicles, IoT."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，小米2024年进入电动车市场，全球销量突破5亿台设备。",
                "en": "Attended the 2025 Private Enterprise Symposium, Xiaomi entered the EV market in 2024, global sales exceeded 500 million devices."
              } 
            },
            { id: "liu_yonghao", name: "刘永好 (Liu Yonghao)", 
              contribution: {
                "zh-CN": "新希望集团董事长，领导农业与食品加工巨头，扩展金融投资和房地产领域。",
                "en": "Chairman of New Hope Group, leads a major agricultural and food processing conglomerate, expanding into financial investment and real estate."
              }, 
              field: {
                "zh-CN": "农业、金融投资、房地产。",
                "en": "Agriculture, Financial Investment, Real Estate."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，新希望为中国最大民营农业企业之一，多元化战略增强市场影响力。",
                "en": "Attended the 2025 Private Enterprise Symposium, New Hope is one of China's largest private agricultural enterprises, its diversified strategy enhancing market influence."
              } 
            },
            { id: "liang_wenfeng", name: "梁文锋 (Liang Wenfeng)", 
              contribution: {
                "zh-CN": "DeepSeek创始人，开发低成本、高性能开源AI大模型（如V3及R1），推动中国AI产业进步，挑战全球AI竞争格局。",
                "en": "Founder of DeepSeek, developed low-cost, high-performance open-source large AI models (e.g., V3 and R1), advancing China's AI industry and challenging the global AI competitive landscape."
              }, 
              field: {
                "zh-CN": "人工智能、量化金融、技术创新。",
                "en": "Artificial Intelligence, Quantitative Finance, Technological Innovation."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，17岁考入浙大，30岁创立幻方量化，36岁管理千亿私募，AI创新引发全球关注。",
                "en": "Attended the 2025 Private Enterprise Symposium, admitted to Zhejiang University at 17, founded High-Flyer Quant at 30, managed a trillion-CNY private equity fund at 36, his AI innovation gaining global attention."
              } 
            },
            { id: "ren_zhengfei", name: "任正非 (Ren Zhengfei)", 
              contribution: {
                "zh-CN": "华为创始人兼首席执行官，领导全球通信设备和智能手机巨头，开发麒麟芯片和鸿蒙系统，推动5G技术全球应用。",
                "en": "Founder and CEO of Huawei, leads a global telecommunications equipment and smartphone giant, developed Kirin chips and HarmonyOS, promoting global 5G technology adoption."
              }, 
              field: {
                "zh-CN": "电信设备、人工智能、5G技术。",
                "en": "Telecommunications Equipment, Artificial Intelligence, 5G Technology."
              }, 
              remarks: {
                "zh-CN": "出席2025年民营企业座谈会，华为2024年营收超1000亿美元，持续应对全球技术竞争。",
                "en": "Attended the 2025 Private Enterprise Symposium, Huawei's 2024 revenue exceeded $100 billion, continuously addressing global tech competition."
              } 
            },
            { id: "liu_qiangdong", name: "刘强东 (Liu Qiangdong)", 
              contribution: {
                "zh-CN": "京东集团创始人兼董事长，打造中国领先的电商与物流平台，推动智能供应链和无人配送技术。",
                "en": "Founder and Chairman of JD.com, built China's leading e-commerce and logistics platform, promoting intelligent supply chain and autonomous delivery technology."
              }, 
              field: {
                "zh-CN": "电子商务、物流技术、人工智能。",
                "en": "E-commerce, Logistics Technology, Artificial Intelligence."
              }, 
              remarks: {
                "zh-CN": "京东2024年服务超7亿用户，引领零售科技融合。",
                "en": "JD.com served over 700 million users in 2024, leading the integration of retail and technology."
              } 
            },
            {id: "yu_kai",  name: "余凯 (Kai Yu)",
              contribution: {
                "zh-CN": "地平线机器人创始人兼首席执行官，领导征程系列车规级芯片及高阶智能驾驶解决方案，实现中国乘用车智驾芯片规模量产。",
                "en": "Founder and CEO of Horizon Robotics, leads the Journey series automotive-grade chips and high-level intelligent driving solutions, achieving large-scale mass production of intelligent driving chips in Chinese passenger vehicles."
              },
              field: {
                "zh-CN": "人工智能、自动驾驶、边缘计算、机器人时代计算基础设施。",
                "en": "Artificial Intelligence, Autonomous Driving, Edge Computing, Computing Infrastructure for the Robotics Era."
              },
              remarks: {
                "zh-CN": "2024年10月带领地平线香港上市，2025年征程系列计算方案累计出货量突破1000万套，成为国内首家达成该里程碑的智驾科技企业。",
                "en": "Led Horizon Robotics to list in Hong Kong in October 2024; in 2025, the Journey series computing solutions exceeded 10 million cumulative shipments, making Horizon the first intelligent driving tech company in China to reach this milestone."
              }
            },
            { 
              id: "chen_zongnian", 
              name: "陈宗年 (Chen Zongnian)",
              contribution: {
                "zh-CN": "海康威视创始核心人物之一，曾任董事长，带领公司从视频压缩板卡起步，成为全球领先的视频监控与智能物联网解决方案提供商，推动安防行业数字化转型。",
                "en": "One of the founding core figures of Hikvision, former Chairman, led the company from video compression boards to become a global leader in video surveillance and intelligent IoT solutions, driving digital transformation in the security industry."
              },
              field: {
                "zh-CN": "视频监控、安防技术、智能物联网。",
                "en": "Video Surveillance, Security Technology, Intelligent IoT."
              },
              remarks: {
                "zh-CN": "华中科技大学校友，与胡扬忠、龚虹嘉形成创业铁三角；公司成长为全球安防龙头，强调民企机制与国企战略定力结合的技术创新路线。",
                "en": "Alumnus of Huazhong University of Science and Technology, formed the founding 'iron triangle' with Hu Yangzhong and Gong Hongjia; grew the company into the global security leader with market value once exceeding 300 billion RMB, emphasizing the combination of private enterprise mechanisms and state-owned strategic focus in technological innovation."
              }
            },
            { 
              id: "liu_sheng", 
              name: "刘圣 (Liu Sheng)",
              contribution: {
                "zh-CN": "中际旭创创始人、董事长兼总裁，从美国归国创业，领导公司成为全球高速光模块（400G/800G及以上）领先供应商，推动AI数据中心光互联技术进步。",
                "en": "Founder, Chairman and President of Zhongji Innolight, returned from the US to start a business, led the company to become a global leader in high-speed optical modules (400G/800G and above), advancing optical interconnect technology for AI data centers."
              },
              field: {
                "zh-CN": "光通信、光模块、人工智能数据中心。",
                "en": "Optical Communications, Optical Modules, AI Data Centers."
              },
              remarks: {
                "zh-CN": "清华大学本科、中科院硕士、佐治亚理工博士，曾任职朗讯、Opnext等国际企业；2008年创立苏州旭创，通过并购重组实现高速增长，公司全球光模块市场份额领先，受益于AI算力需求。",
                "en": "Tsinghua University undergraduate, Chinese Academy of Sciences master's, Georgia Tech PhD; previously worked at Lucent, Opnext and other international firms; founded Suzhou Innolight in 2008, achieved rapid growth through M&A restructuring, leading global optical module market share, benefiting from AI computing power demand."
              }
            },
            { 
              id: "yuan_yonggang", 
              name: "袁永刚 (Yuan Yonggang)",
              contribution: {
                "zh-CN": "东山精密董事长、实际控制人之一，主导公司从精密钣金制造向高端电子电路、PCB及AI光模块领域战略转型，通过资本运作和并购实现高速扩张。",
                "en": "Chairman and one of the actual controllers of Dongshan Precision, led the company's strategic transformation from precision sheet metal manufacturing to high-end electronic circuits, PCB and AI optical modules, achieving rapid expansion through capital operations and M&A."
              },
              field: {
                "zh-CN": "精密制造、电子电路、光模块、资本运作。",
                "en": "Precision Manufacturing, Electronic Circuits, Optical Modules, Capital Operations."
              },
              remarks: {
                "zh-CN": "1998年进入家族企业，2010年主导公司上市；与兄长袁永峰、父亲袁富根形成家族经营核心，推动重大并购（如索尔思光电），公司业务升级为AI算力相关领域重要供应商。",
                "en": "Born in 1979, joined the family business in 1998, led the company's IPO in 2010; forms the core of family management with brother Yuan Yongfeng and father Yuan Fugen, drove major acquisitions (e.g., Source Photonics), upgrading the company's business into a key supplier in AI computing power-related fields."
              }
            },
            { 
              id: "yang_zhilin", 
              name: "杨植麟 (Yang Zhilin)",
              contribution: {
                "zh-CN": "月之暗面创始人兼首席执行官，推出Kimi智能助手，以超长上下文能力引领行业，推动大模型长文本处理和多模态技术发展。",
                "en": "Founder and CEO of Moonshot AI, launched Kimi intelligent assistant, leading the industry with ultra-long context capabilities, advancing long-text processing and multimodal technology in large models."
              },
              field: {
                "zh-CN": "大语言模型、人工智能、自然语言处理。",
                "en": "Large Language Models, Artificial Intelligence, Natural Language Processing."
              },
              remarks: {
                "zh-CN": "卡内基梅隆大学博士，曾任职Facebook AI Research、Google Brain，XLNet论文第一作者。",
                "en": "Carnegie Mellon University PhD; previously worked at Facebook AI Research and Google Brain,first author of XLNet paper."
              }
            },
            { 
              id: "zhang_peng_zhipu", 
              name: "张鹏 (Zhang Peng)",
              contribution: {
                "zh-CN": "智谱AI创始人兼首席执行官，带领团队开发GLM系列大模型，推动知识图谱与大模型融合，从清华实验室走向产业化，构建自主可控的国产大模型体系。",
                "en": "Founder and CEO of Zhipu AI, led the team to develop the GLM series of large models, promoted the integration of knowledge graphs and large models, transitioned from Tsinghua lab to industrialization, building an independent and controllable domestic large model system."
              },
              field: {
                "zh-CN": "大语言模型、知识图谱、认知智能。",
                "en": "Large Language Models, Knowledge Graphs, Cognitive Intelligence."
              },
              remarks: {
                "zh-CN": "源自清华KEG实验室，公司GLM模型开源与商用并重，服务众多企业用户。",
                "en": "From Tsinghua KEG Lab, GLM models emphasize both open-source and commercial use, serving numerous enterprise users."
              }
            },
            { 
              id: "yan_junjie", 
              name: "闫俊杰 (Yan Junjie)",
              contribution: {
                "zh-CN": "MiniMax创始人、CEO兼首席技术官，推出多模态大模型及海螺AI等应用，推动通用人工智能发展，专注多模态和工程落地。",
                "en": "Founder, CEO and CTO of MiniMax, launched the multimodal large models and applications such as Hailuo AI , advancing general artificial intelligence (AGI) development with focus on multimodality and engineering implementation."
              },
              field: {
                "zh-CN": "多模态大模型、通用人工智能、AI应用。",
                "en": "Multimodal Large Models, General Artificial Intelligence, AI Applications."
              },
              remarks: {
                "zh-CN": "曾任商汤科技副总裁，2021年底创立MiniMax，快速成为AI独角兽，推出开源模型，强调技术驱动与普惠应用。",
                "en": "Former Vice President at SenseTime, founded MiniMax at the end of 2021, rapidly becoming an AI unicorn, released open-source models, emphasizing technology-driven and inclusive applications."
              }
            },
            {
              id: "yu_donglai", name: "于东来 (Yu Donglai)",
              contribution: {
                "zh-CN": "胖东来商贸集团创始人兼董事长，以‘自由·爱’为核心价值观，打造中国零售业人文关怀标杆，坚持高品质商品、极致服务与员工福利优先的经营模式。",
                "en": "Founder and Chairman of Pang Donglai Commercial Trade Group, with 'Freedom · Love' as core values, created a humanistic benchmark in China's retail industry, adhering to a business model prioritizing high-quality goods, ultimate service, and employee welfare."
              },
              field: {
                "zh-CN": "零售商贸、连锁超市、企业管理、人文关怀。",
                "en": "Retail Commerce, Supermarket Chain, Corporate Management, Humanistic Care."
              },
              remarks: {
                "zh-CN": "2023年起逐步淡出日常管理，转向企业文化传承与公益事业。",
                "en": "Since 2023, gradually stepping back from daily operations to focus on corporate culture inheritance and philanthropy."
              }
            }
        ];
