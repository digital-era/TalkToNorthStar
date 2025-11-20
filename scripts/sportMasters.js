        const sportMasters = [
              { id: "michael_phelps", name: "Michael Phelps",
                contribution: {
                  "zh-CN": "获得28枚奥运金牌（23枚个人），打破多项世界纪录。",
                  "en": "Won 28 Olympic gold medals (23 individual), broke numerous world records."
                },
                field: {
                  "zh-CN": "游泳。",
                  "en": "Swimming."
                },
                remarks: {
                  "zh-CN": "游泳史上无可匹敌的霸主，其耐力和技术革新定义了现代竞技游泳标准。",
                  "en": "Unrivaled dominator in swimming history, his endurance and technique defined modern competitive swimming standards."
                }
              },
              { id: "usain_bolt", name: "Usain Bolt",
                contribution: {
                  "zh-CN": "三届奥运100m/200m金牌，9秒58世界纪录。",
                  "en": "Three-time Olympic 100m/200m gold medalist, 9.58-second world record."
                },
                field: {
                  "zh-CN": "田径（短跑）。",
                  "en": "Athletics (Sprinting)."
                },
                remarks: {
                  "zh-CN": "速度的化身，推动田径进入娱乐化时代，全球最具标志性的运动员形象。",
                  "en": "Embodiment of speed, propelled athletics into an entertainment era, global iconic athlete image."
                }
              },
              { id: "michael_jordan", name: "Michael Jordan",
                contribution: {
                  "zh-CN": "6次NBA总冠军，5次MVP，篮球名人堂。",
                  "en": "6 NBA championships, 5 MVPs, Basketball Hall of Fame."
                },
                field: {
                  "zh-CN": "篮球。",
                  "en": "Basketball."
                },
                remarks: {
                  "zh-CN": "篮球全球化的推动者，其竞技精神和商业影响力重塑了团队运动格局。",
                  "en": "Pioneer of basketball globalization, his competitive spirit and commercial influence reshaped team sports landscape."
                }
              },
              { id: "muhammad_ali", name: "Muhammad Ali",
                contribution: {
                  "zh-CN": "三次重量级冠军，奥运金牌，社会活动家。",
                  "en": "Three-time heavyweight champion, Olympic gold medalist, social activist."
                },
                field: {
                  "zh-CN": "拳击。",
                  "en": "Boxing."
                },
                remarks: {
                  "zh-CN": "超越竞技的传奇，融合体育与文化变革，象征勇气与正义。",
                  "en": "Legend transcending sports, fused athletics with cultural change, symbolizes courage and justice."
                }
              },
              { id: "serena_williams", name: "Serena Williams",
                contribution: {
                  "zh-CN": "23个大满贯单打冠军，奥运金牌。",
                  "en": "23 Grand Slam singles titles, Olympic gold medals."
                },
                field: {
                  "zh-CN": "网球。",
                  "en": "Tennis."
                },
                remarks: {
                  "zh-CN": "女子网球的统治者，推动性别平等与多样性，其力量与韧性启发后辈。",
                  "en": "Dominator of women's tennis, advanced gender equality and diversity, her power and resilience inspire successors."
                }
              },
              { id: "lionel_messi", name: "Lionel Messi",
                contribution: {
                  "zh-CN": "8次金球奖，2022世界杯冠军，超过800球进球。",
                  "en": "8 Ballon d'Or awards, 2022 World Cup champion, over 800 career goals."
                },
                field: {
                  "zh-CN": "足球。",
                  "en": "Football."
                },
                remarks: {
                  "zh-CN": "现代足球的典范，其技术与视野革新了进攻艺术，推动全球足球商业化。",
                  "en": "Paradigm of modern football, his technique and vision revolutionized attacking play, propelled global football commercialization."
                }
              },
              { id: "cristiano_ronaldo", name: "Cristiano Ronaldo",
                contribution: {
                  "zh-CN": "5次金球奖，5次欧冠冠军，953粒职业生涯进球（截至2025年11月）。",
                  "en": "5 Ballon d'Or awards, 5 UEFA Champions League titles, 953 career goals (as of November 2025)."
                },
                field: {
                  "zh-CN": "足球。",
                  "en": "Football."
                },
                remarks: {
                  "zh-CN": "进球机器的代名词，其跨联赛冠军与持久耐力重塑了足球竞技标准，激励全球数亿球迷。",
                  "en": "Synonym for goal-scoring machine, his cross-league titles and enduring stamina reshaped football standards, inspiring billions worldwide."
                }
              },
             { id: "simone_biles", name: "Simone Biles",
                contribution: {
                  "zh-CN": "11枚世锦赛金牌+8枚奥运金牌，创造多项体操最高难度动作。",
                  "en": "11 World Championship golds + 8 Olympic golds, created multiple highest-difficulty gymnastics elements."
                },
                field: {
                  "zh-CN": "体操。",
                  "en": "Gymnastics."
                },
                remarks: {
                  "zh-CN": "体操史上最伟大女运动员，其难度与艺术性重新定义女子体操天花板，推动心理健康议题。",
                  "en": "Greatest female gymnast ever; redefined the ceiling of women's gymnastics with difficulty and artistry, advanced mental health advocacy."
                }
              },
              { id: "carl_lewis", name: "Carl Lewis",
                contribution: {
                  "zh-CN": "9枚奥运金牌（跨100m、跳远、4×100m），保持多项田径世界纪录长达30年。",
                  "en": "9 Olympic golds (100m, long jump, 4×100m), held multiple world records for over 30 years."
                },
                field: {
                  "zh-CN": "田径（短跑与跳远）。",
                  "en": "Athletics (Sprinting & Long Jump)."
                },
                remarks: {
                  "zh-CN": "田径全能王，其优雅与统治力使跳远成为艺术，跨时代影响力仅次于博尔特。",
                  "en": "King of track and field versatility; made long jump an art form, cross-era influence second only to Bolt."
                }
              },
              { id: "pele", name: "Pelé",
                contribution: {
                  "zh-CN": "3次世界杯冠军，官方1283粒职业进球，唯一三夺世界杯球员。",
                  "en": "3 World Cup titles, 1,283 official career goals, only player to win three World Cups."
                },
                field: {
                  "zh-CN": "足球。",
                  "en": "Football."
                },
                remarks: {
                  "zh-CN": "足球史上最伟大的球王，其创造力与进球效率奠定现代足球美学，全球第一体育偶像。",
                  "en": "Greatest footballer ever; creativity and goal efficiency established modern football aesthetics, world's first global sports icon."
                }
              },
              { id: "novak_djokovic", name: "Novak Djokovic",
                contribution: {
                  "zh-CN": "24个大满贯单打冠军（截至2025年11月），保持No.1周数最长纪录。",
                  "en": "24 Grand Slam singles titles (as of November 2025), longest weeks as world No.1."
                },
                field: {
                  "zh-CN": "网球。",
                  "en": "Tennis."
                },
                remarks: {
                  "zh-CN": "男子网球历史最佳，其身体素质、防守与心理韧性重塑现代底线打法。",
                  "en": "Greatest male tennis player ever; physicality, defense, and mental toughness reshaped baseline play."
                }
              },
              { id: "max_verstappen", name: "Max Verstappen",
                contribution: {
                  "zh-CN": "4次F1世界冠军（2021–2024），最年轻分站冠军，最多单赛季胜利纪录。",
                  "en": "4 consecutive F1 World Championships (2021–2024), youngest race winner, most wins in a season record."
                },
                field: {
                  "zh-CN": "一级方程式赛车。",
                  "en": "Formula 1 Racing."
                },
                remarks: {
                  "zh-CN": "当代F1统治者，其进攻性驾驶与数据分析能力推动赛车运动进入新世代。",
                  "en": "Dominant force in modern F1; aggressive driving and data mastery ushered motorsport into a new era."
                }
              },
             { id: "tiger_woods", name: "Tiger Woods",
                contribution: {
                  "zh-CN": "15个大满贯冠军、82场美巡赛胜利（并列历史第一）、保持世界第一位310周。",
                  "en": "15 Major championships, 82 PGA Tour wins (tied for most all-time), 310 weeks as world No.1."
                },
                field: {
                  "zh-CN": "高尔夫。",
                  "en": "Golf."
                },
                remarks: {
                  "zh-CN": "高尔夫运动的全球革命者，其力量、精准与竞技精神将高尔夫带入亿万观众时代，影响力无人能及。",
                  "en": "Global revolutionary of golf; his power, precision, and competitive spirit brought the game to billions, unmatched influence in history."
                }
              },
              { id: "faker", name: "Faker",
                contribution: {
                  "zh-CN": "6次LoL世界冠军（2013,2015,2016,2023,2024,2025）、首位10次参赛、LoL名人堂首位入选者。",
                  "en": "6 LoL Worlds titles (2013,2015,2016,2023,2024,2025), first to 10 Worlds appearances, inaugural LoL Hall of Legends inductee."
                },
                field: {
                  "zh-CN": "电子竞技（英雄联盟）。",
                  "en": "Esports (League of Legends)."
                },
                remarks: {
                  "zh-CN": "电子竞技史上无可争议GOAT，其统治力、长寿职业生涯与国际成就定义MOBA竞技巅峰。",
                  "en": "Undisputed GOAT of esports history; dominance, longevity, and international feats defined MOBA competitive peak."
                }
              },
              { id: "s1mple", name: "s1mple",
                contribution: {
                  "zh-CN": "21次HLTV MVP、1次Major冠军、Intel Grand Slam，CS:GO/CS2历史最佳选手。",
                  "en": "21 HLTV MVPs, 1 Major title, Intel Grand Slam; greatest CS:GO/CS2 player of all time."
                },
                field: {
                  "zh-CN": "电子竞技（CS:GO/CS2）。",
                  "en": "Esports (CS:GO/CS2)."
                },
                remarks: {
                  "zh-CN": "FPS竞技传奇，其超凡瞄准与游戏感重塑射击游戏标准，MVP纪录无人能及。",
                  "en": "FPS legend; unparalleled aim and game sense reshaped shooter standards, MVP record unmatched."
                }
              }
        ]; 
