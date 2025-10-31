        const financeMasters = [
            { id: "warren_buffett", name: "Warren Buffett", 
              contribution: {
                "zh-CN": "伯克希尔·哈撒韦首席执行官，价值投资代表，管理数百亿美元资产，以长期投资和资本配置著称。",
                "en": "CEO of Berkshire Hathaway, a representative of value investing, manages tens of billions of dollars in assets, known for long-term investment and capital allocation."
              }, 
              field: {
                "zh-CN": "价值投资、资产管理、资本配置。",
                "en": "Value Investing, Asset Management, Capital Allocation."
              }, 
              remarks: {
                "zh-CN": "被称为“奥马哈先知”，其投资哲学强调企业内在价值，影响全球金融市场。",
                "en": "Known as the 'Oracle of Omaha,' his investment philosophy emphasizes intrinsic business value, influencing global financial markets."
              } 
            },
            { id: "ray_dalio", name: "Ray Dalio", 
              contribution: {
                "zh-CN": "桥水基金创始人，开发全天候投资策略，推动宏观经济分析与风险平价投资。",
                "en": "Founder of Bridgewater Associates, developed the All Weather investment strategy, promoting macroeconomic analysis and risk parity investing."
              }, 
              field: {
                "zh-CN": "对冲基金、宏观投资、资产配置。",
                "en": "Hedge Funds, Macro Investing, Asset Allocation."
              }, 
              remarks: {
                "zh-CN": "桥水为全球最大对冲基金之一，其《原则》分享投资与管理哲学。",
                "en": "Bridgewater is one of the world's largest hedge funds; his book 'Principles' shares investment and management philosophies."
              } 
            },
            { id: "larry_fink", name: "Larry Fink", 
              contribution: {
                "zh-CN": "贝莱德创始人兼首席执行官，推动ESG投资框架，开发iShares ETF。",
                "en": "Founder and CEO of BlackRock, promotes ESG investment framework, developed iShares ETFs."
              }, 
              field: {
                "zh-CN": "资产管理、ESG投资、指数基金。",
                "en": "Asset Management, ESG Investing, Index Funds."
              }, 
              remarks: {
                "zh-CN": "管理超10万亿美元资产，ESG倡导重塑全球投资趋势。",
                "en": "Manages over $10 trillion in assets, ESG advocacy reshaping global investment trends."
              } 
            }, 
            { id: "john_bogle", name: "John C. Bogle", 
              contribution: {
                "zh-CN": "Vanguard集团创始人，创建首只零售指数基金，倡导低成本、被动投资策略，颠覆资产管理行业。",
                "en": "Founder of The Vanguard Group, created the first retail index fund, advocated for low-cost, passive investment strategies, disrupting the asset management industry."
              }, 
              field: {
                "zh-CN": "资产管理、指数基金、零售投资。",
                "en": "Asset Management, Index Funds, Retail Investment."
              }, 
              remarks: {
                "zh-CN": "被称为“指数基金之父”，Vanguard管理资产超8万亿美元，其理念惠及全球投资者。",
                "en": "Dubbed the 'Father of Index Funds,' Vanguard manages over $8 trillion in assets, and his philosophy benefits investors worldwide."
              } 
            },
            { id: "george_soros", name: "George Soros", 
              contribution: {
                "zh-CN": "索罗斯基金创始人，量子基金缔造者，以1992年狙击英镑闻名，提出“反身性”理论。",
                "en": "Founder of Soros Fund Management, creator of the Quantum Fund, famous for shorting the British pound in 1992, proposed the 'reflexivity' theory."
              }, 
              field: {
                "zh-CN": "对冲基金、货币投机、宏观投资。",
                "en": "Hedge Funds, Currency Speculation, Macro Investment."
              }, 
              remarks: {
                "zh-CN": "通过开放社会基金会影响政策，其策略深刻影响金融市场。",
                "en": "Influences policy through the Open Society Foundations; his strategies profoundly impact financial markets."
              } 
            },  
            { id: "abigail_johnson", name: "Abigail Johnson", 
              contribution: {
                "zh-CN": "富达投资主席兼首席执行官，推动低成本投资产品和数字化金融服务。",
                "en": "Chairman and CEO of Fidelity Investments, promoting low-cost investment products and digital financial services."
              }, 
              field: {
                "zh-CN": "资产管理、零售投资、金融科技。",
                "en": "Asset Management, Retail Investment, FinTech."
              }, 
              remarks: {
                "zh-CN": "管理超4万亿美元资产，推动ETF和加密货币领域创新。",
                "en": "Manages over $4 trillion in assets, driving innovation in ETFs and cryptocurrency."
              } 
            },
            { id: "jamie_dimon", name: "Jamie Dimon", 
              contribution: {
                "zh-CN": "摩根大通首席执行官，领导全球最大银行之一，擅长风险管理和金融创新。",
                "en": "CEO of JPMorgan Chase, leads one of the world's largest banks, proficient in risk management and financial innovation."
              }, 
              field: {
                "zh-CN": "投资银行、商业银行、金融管理。",
                "en": "Investment Banking, Commercial Banking, Financial Management."
              }, 
              remarks: {
                "zh-CN": "2008年金融危机中展现卓越领导力，被视为银行业标杆。",
                "en": "Demonstrated exceptional leadership during the 2008 financial crisis, considered a benchmark in the banking industry."
              } 
            },
            { id: "vinod_khosla", name: "Vinod Khosla", 
              contribution: {
                "zh-CN": "Khosla Ventures创始人，投资支持多家AI与量子计算初创公司（如OpenAI早期投资），推动前沿技术商业化与可持续发展。",
                "en": "Founder of Khosla Ventures, invests in and supports numerous AI and quantum computing startups (e.g., early investor in OpenAI), promoting the commercialization of cutting-edge technologies and sustainable development."
              }, 
              field: {
                "zh-CN": "人工智能、量子计算、风险投资。",
                "en": "Artificial Intelligence, Quantum Computing, Venture Capital."
              }, 
              remarks: {
                "zh-CN": "作为技术投资领域的先驱，对AI与量子计算交叉领域的战略投资具有深远影响力。",
                "en": "As a pioneer in tech investment, he has a profound impact on strategic investments at the intersection of AI and quantum computing."
              } 
            },
            { id: "cathie_wood", name: "Cathie Wood", 
              contribution: {
                "zh-CN": "ARK Invest创始人，专注AI、区块链等创新投资，推动主动管理ETF普及。",
                "en": "Founder of ARK Invest, specializes in innovative investments like AI and blockchain, popularizing actively managed ETFs."
              }, 
              field: {
                "zh-CN": "创新投资、ETF、人工智能与金融科技。",
                "en": "Innovation Investing, ETFs, AI & FinTech."
              }, 
              remarks: {
                "zh-CN": "以长期投资科技驱动行业著称，吸引年轻投资者。",
                "en": "Known for long-term investment in tech-driven industries, attracting younger investors."
              } 
            },   
            { id: "mary_meeker", name: "Mary Meeker", 
              contribution: {
                "zh-CN": "Kleiner Perkins合伙人，发布年度《互联网趋势报告》，推动互联网与AI投资，预测数字经济转型。",
                "en": "Kleiner Perkins partner, publishes annual Internet Trends Report, drives internet and AI investments, predicts digital economy transformation."
              }, 
              field: {
                "zh-CN": "风险投资、互联网金融、技术趋势分析。",
                "en": "Venture Capital, Internet Finance, Technology Trends Analysis."
              }, 
              remarks: {
                "zh-CN": "被誉为“互联网女王”，其报告指引全球科技投资方向。",
                "en": "Dubbed the 'Queen of the Internet,' her reports guide global tech investment trends."
              } 
            },
            { id: "carl_icahn", name: "Carl Icahn", 
              contribution: {
                "zh-CN": "Icahn Enterprises创始人，通过股东行动主义推动企业重组和价值释放。",
                "en": "Founder of Icahn Enterprises, drives corporate restructuring and value creation through shareholder activism."
              }, 
              field: {
                "zh-CN": "激进投资、股权投资、企业重组。",
                "en": "Activist Investing, Equity Investment, Corporate Restructuring."
              }, 
              remarks: {
                "zh-CN": "以大胆投资和对抗管理层著称，影响美国企业治理格局。",
                "en": "Known for bold investments and challenging management, influencing the landscape of U.S. corporate governance."
              } 
            },
            { id: "jeremy_grantham", name: "Jeremy Grantham", 
              contribution: {
                "zh-CN": "GMO联合创始人，倡导价值投资与市场泡沫预警，注重环境可持续性投资。",
                "en": "Co-founder of GMO, advocates for value investing and market bubble warnings, emphasizes environmentally sustainable investment."
              }, 
              field: {
                "zh-CN": "价值投资、资产管理、可持续投资。",
                "en": "Value Investing, Asset Management, Sustainable Investment."
              }, 
              remarks: {
                "zh-CN": "以准确预测市场泡沫（如2008年金融危机）著称，强调气候变化对投资的影响。",
                "en": "Known for accurately predicting market bubbles (e.g., the 2008 financial crisis), emphasizes the impact of climate change on investment."
              } 
            },
            { id: "duan_yongping", name: "Duan Yongping",
                contribution: {
                "zh-CN": "步步高电子创始人，OPPO、Vivo和拼多多早期投资者，价值投资实践者，曾竞拍巴菲特午餐，推动中国消费电子与科技投资。",
                "en": "Founder of BBK Electronics, early investor in OPPO, Vivo, and Pinduoduo, practitioner of value investing, famously bid for lunch with Buffett, advancing Chinese consumer electronics and tech investments."
                },
                field: {
                "zh-CN": "价值投资、技术创业、消费电子。",
                "en": "Value Investing, Tech Entrepreneurship, Consumer Electronics."
                },
                remarks: {
                "zh-CN": "其投资哲学强调长期价值，受巴菲特影响，成功孵化多家科技巨头。",
                "en": "His investment philosophy emphasizes long-term value, influenced by Buffett, successfully incubating multiple tech giants."
                }
             },
             { id: "li_lu", name: "Li Lu",
                contribution: {
                "zh-CN": "喜马拉雅资本创始人，价值投资专家，管理超140亿美元资产，推动中美跨国投资与价值导向策略。",
                "en": "Founder of Himalaya Capital, value investing expert, manages over $14 billion in assets, promoting cross-border investments between China and the US with value-oriented strategies."
                },
                field: {
                "zh-CN": "价值投资、对冲基金、跨国投资。",
                "en": "Value Investing, Hedge Funds, Cross-Border Investment."
                },
                remarks: {
                "zh-CN": "其基金实现卓越长期回报，影响全球价值投资实践。",
                "en": "Praised by Charlie Munger, his fund achieved outstanding long-term returns, influencing global value investing practices."
            },
            { 
                id: "rupert_hoogewerf", name: "Rupert Hoogewerf", 
                contribution: {
                    "zh-CN": "胡润百富创始人，主要编制胡润富豪榜，推动中国企业家财富透明化与全球富豪排名标准化。",
                    "en": "Founder of Hurun Report, primarily compiles the Hurun Rich List, promoting transparency in Chinese entrepreneurs' wealth and standardization of global billionaire rankings."
                }, 
                field: {
                    "zh-CN": "财富排名、富豪榜编制、企业家研究。",
                    "en": "Wealth Rankings, Rich List Compilation, Entrepreneur Research."
                }, 
                remarks: {
                    "zh-CN": "被称为“胡润”，其榜单已成为中国财富风向标，影响全球商业与投资决策。",
                    "en": "Known as 'Hurun,' his lists have become a barometer of wealth in China, influencing global business and investment decisions."
                } 
            }
        ];
