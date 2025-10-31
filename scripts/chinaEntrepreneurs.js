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
            }
        ];
