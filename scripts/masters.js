        // --- Data (Modified to include English translations for contribution, field, remarks) ---
        const aiQuantumMasters = [
            { id: "sam_altman", name: "Sam Altman", 
              contribution: {
                "zh-CN": "OpenAI首席执行官，领导ChatGPT开发，推动生成式AI大众化，倡导AI民主治理与伦理发展。",
                "en": "CEO of OpenAI, led ChatGPT development, popularized generative AI, advocated for democratic AI governance and ethical development."
              }, 
              field: {
                "zh-CN": "人工智能（生成式AI、AGI）、技术创业。",
                "en": "Artificial Intelligence (Generative AI, AGI), Tech Entrepreneurship."
              }, 
              remarks: {
                "zh-CN": "2024年被认为是AI热潮的核心人物，影响力覆盖产业与政策。",
                "en": "Considered the central figure of the 2024 AI boom, influencing both industry and policy."
              } 
            },
            { id: "elon_musk", name: "Elon Musk", 
              contribution: {
                "zh-CN": "xAI创始人，开发Grok以加速人类科学发现，Tesla与SpaceX的AI应用先锋，早期支持OpenAI。",
                "en": "Founder of xAI, developed Grok to accelerate human scientific discovery, AI application pioneer at Tesla and SpaceX, early supporter of OpenAI."
              }, 
              field: {
                "zh-CN": "人工智能（AGI、自动驾驶）、量子技术投资。",
                "en": "Artificial Intelligence (AGI, Autonomous Driving), Quantum Technology Investment."
              }, 
              remarks: {
                "zh-CN": "通过xAI推动AI与量子计算的交叉应用，强调技术对人类的长期影响。",
                "en": "Promotes the interdisciplinary application of AI and quantum computing through xAI, emphasizing the long-term impact of technology on humanity."
              } 
            },
            { id: "demis_hassabis", name: "Demis Hassabis", 
              contribution: {
                "zh-CN": "Google DeepMind首席执行官，开发AlphaGo与AlphaFold，2024年获诺贝尔化学奖，推动AGI与科学发现。",
                "en": "CEO of Google DeepMind, developed AlphaGo and AlphaFold, Nobel laureate in Chemistry (2024), drives AGI and scientific discovery."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、强化学习）、生物计算。",
                "en": "Artificial Intelligence (Deep Learning, Reinforcement Learning), Bio-computation."
              }, 
              remarks: {
                "zh-CN": "DeepMind在AI与量子计算模拟（如蛋白质折叠）交叉领域具有开创性影响。",
                "en": "DeepMind has pioneering influence in the intersection of AI and quantum computing simulations (e.g., protein folding)."
              } 
            },
            { id: "jensen_huang", name: "Jensen Huang", 
              contribution: {
                "zh-CN": "NVIDIA首席执行官，GPU技术推动AI基础设施，引领高性能计算与AI训练的硬件革命。",
                "en": "CEO of NVIDIA, GPU technology drives AI infrastructure, leading the hardware revolution in high-performance computing and AI training."
              }, 
              field: {
                "zh-CN": "人工智能（硬件加速）、高性能计算。",
                "en": "Artificial Intelligence (Hardware Acceleration), High-Performance Computing."
              }, 
              remarks: {
                "zh-CN": "NVIDIA的芯片技术为AI与量子计算提供了关键计算支持。",
                "en": "NVIDIA's chip technology provides crucial computational support for AI and quantum computing."
              } 
            },
            { id: "dario_amodei", name: "Dario Amodei", 
              contribution: {
                "zh-CN": "Anthropic首席执行官，开发Claude，强调安全AI系统，前OpenAI研究员，探索AI规模化定律。",
                "en": "CEO of Anthropic, developed Claude, emphasizes safe AI systems, former OpenAI researcher, explores AI scaling laws."
              }, 
              field: {
                "zh-CN": "人工智能（安全AI、生成式AI）。",
                "en": "Artificial Intelligence (Safe AI, Generative AI)."
              }, 
              remarks: {
                "zh-CN": "Anthropic致力于负责任的AI开发，与OpenAI形成竞争。",
                "en": "Anthropic is committed to responsible AI development, forming competition with OpenAI."
              } 
            },
            { id: "geoffrey_hinton", name: "Geoffrey Hinton", 
              contribution: {
                "zh-CN": "AI“教父”，神经网络与深度学习先驱，2018年图灵奖得主，2024年诺贝尔奖得主，关注AI伦理风险。",
                "en": "AI 'Godfather', pioneer of neural networks and deep learning, Turing Award laureate (2018), Nobel laureate (2024), concerned about AI ethical risks."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、神经网络）。",
                "en": "Artificial Intelligence (Deep Learning, Neural Networks)."
              }, 
              remarks: {
                "zh-CN": "2024年从Google辞职以自由警示AI潜在危险，影响力深远。",
                "en": "Resigned from Google in 2024 to freely warn about potential AI dangers, with profound influence."
              } 
            },
            { id: "ilya_sutskever", name: "Ilya Sutskever", 
              contribution: {
                "zh-CN": "OpenAI联合创始人，开发AlexNet与GPT系列，推动深度学习与生成式AI，2024年创立Safe Superintelligence。",
                "en": "OpenAI co-founder, developed AlexNet and GPT series, promoted deep learning and generative AI, founded Safe Superintelligence in 2024."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、AGI）。",
                "en": "Artificial Intelligence (Deep Learning, AGI)."
              }, 
              remarks: {
                "zh-CN": "专注于超级智能的安全性，持续影响AGI研究方向。",
                "en": "Focused on the safety of superintelligence, continuously influencing the direction of AGI research."
              } 
            },
            { id: "ray_kurzweil", name: "Ray Kurzweil", 
              contribution: {
                "zh-CN": "未来学家，预测AI奇点（2045年），Google工程总监，推动AI与人类智能融合研究。",
                "en": "Futurist, predicted the AI Singularity (2045), Google Engineering Director, promotes research on AI and human intelligence integration."
              }, 
              field: {
                "zh-CN": "人工智能（未来学、AI奇点）。",
                "en": "Artificial Intelligence (Futurism, AI Singularity)."
              }, 
              remarks: {
                "zh-CN": "其大胆预测塑造了AI与量子计算的长期愿景。",
                "en": "His bold predictions have shaped the long-term vision for AI and quantum computing."
              } 
            },
            { id: "peter_diamandis", name: "Peter Diamandis", 
              contribution: {
                "zh-CN": "XPRIZE创始人，Singularity University联合创始人，倡导指数型技术（AI、量子计算）解决全球挑战。",
                "en": "Founder of XPRIZE, co-founder of Singularity University, advocates for exponential technologies (AI, quantum computing) to solve global challenges."
              }, 
              field: {
                "zh-CN": "人工智能、量子计算、技术创业。",
                "en": "Artificial Intelligence, Quantum Computing, Tech Entrepreneurship."
              }, 
              remarks: {
                "zh-CN": "通过激励创新推动AI与量子技术商业化。",
                "en": "Promotes the commercialization of AI and quantum technologies through incentive innovation."
              } 
            },
            { id: "eric_schmidt", name: "Eric Schmidt", 
              contribution: {
                "zh-CN": "前Google首席执行官及执行主席，带领Google成为科技巨头，现为技术投资人，支持AI、量子计算、生物技术初创公司。",
                "en": "Former CEO and Executive Chairman of Google, led Google to become a tech giant, now a tech investor, supporting AI, quantum computing, and biotech startups."
              }, 
              field: {
                "zh-CN": "人工智能、云计算、技术投资、科技创新政策。",
                "en": "Artificial Intelligence, Cloud Computing, Tech Investment, Tech Innovation Policy."
              }, 
              remarks: {
                "zh-CN": "积极倡导AI伦理与治理，影响技术产业与公共政策交叉领域。",
                "en": "Actively advocates for AI ethics and governance, influencing the intersection of tech industry and public policy."
              } 
            },
            { id: "jeff_dean", name: "Jeff Dean", 
              contribution: {
                "zh-CN": "Google高级研究员，领导Google Brain与TensorFlow开发，推动AI在搜索、医疗等领域的应用。",
                "en": "Google Senior Fellow, led Google Brain and TensorFlow development, promoting AI applications in search, healthcare, and other fields."
              }, 
              field: {
                "zh-CN": "人工智能（机器学习、系统架构）。",
                "en": "Artificial Intelligence (Machine Learning, System Architecture)."
              }, 
              remarks: {
                "zh-CN": "Google AI基础设施的核心人物，影响全球AI技术栈。",
                "en": "A key figure in Google's AI infrastructure, influencing the global AI technology stack."
              } 
            },
            { id: "yann_lecun", name: "Yann LeCun", 
              contribution: {
                "zh-CN": "Meta首席AI科学家，卷积神经网络（CNN）先驱，2018年图灵奖得主，推动开放AI研究。",
                "en": "Chief AI Scientist at Meta, pioneer of Convolutional Neural Networks (CNN), Turing Award laureate (2018), promotes open AI research."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、计算机视觉）。",
                "en": "Artificial Intelligence (Deep Learning, Computer Vision)."
              }, 
              remarks: {
                "zh-CN": "主张渐进式AI发展，反对AGI恐慌论。",
                "en": "Advocates for gradual AI development, opposes AGI panic theories."
              } 
            },
            { id: "fei_fei_li", name: "Fei-Fei Li", 
              contribution: {
                "zh-CN": "斯坦福大学教授，创建ImageNet，推动计算机视觉革命，倡导以人为本的AI，开发空间智能初创公司。",
                "en": "Stanford University Professor, created ImageNet, propelled the computer vision revolution, advocates for human-centered AI, developed spatial intelligence startup."
              }, 
              field: {
                "zh-CN": "人工智能（计算机视觉、伦理AI）。",
                "en": "Artificial Intelligence (Computer Vision, Ethical AI)."
              }, 
              remarks: {
                "zh-CN": "对AI教育与多样性有深远影响。",
                "en": "Profound influence on AI education and diversity."
              } 
            },
            { id: "andrej_karpathy", name: "Andrej Karpathy", 
              contribution: {
                "zh-CN": "前Tesla与OpenAI研究员，开发神经网络与自动驾驶AI，斯坦福深度学习课程联合设计者，AI教育普及者。",
                "en": "Former Tesla and OpenAI researcher, developed neural networks and autonomous driving AI, co-designer of Stanford's deep learning course, AI education popularizer."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、计算机视觉）。",
                "en": "Artificial Intelligence (Deep Learning, Computer Vision)."
              }, 
              remarks: {
                "zh-CN": "以简化复杂AI概念著称，影响下一代研究者。",
                "en": "Known for simplifying complex AI concepts, influencing the next generation of researchers."
              } 
            },
            { id: "andrew_ng", name: "Andrew Ng", 
              contribution: {
                "zh-CN": "谷歌大脑和Coursera联合创始人，开发大规模在线机器学习课程，推动AI在医疗、教育等领域的应用。",
                "en": "Co-founder of Google Brain and Coursera, developed large-scale online machine learning courses, promoting AI applications in healthcare, education, and other fields."
              }, 
              field: {
                "zh-CN": "机器学习、深度学习、在线教育。",
                "en": "Machine Learning, Deep Learning, Online Education."
              }, 
              remarks: {
                "zh-CN": "以普及AI教育和推动AI民主化著称，创立AI Fund支持AI创业。",
                "en": "Known for popularizing AI education and promoting AI democratization, founded AI Fund to support AI startups."
              } 
            },
            { id: "mustafa_suleyman", name: "Mustafa Suleyman", 
              contribution: {
                "zh-CN": "DeepMind联合创始人，现任微软AI首席执行官，开发情感智能聊天机器人Pi，倡导伦理AI。",
                "en": "DeepMind co-founder, now CEO of Microsoft AI, developed emotional intelligence chatbot Pi, advocates for ethical AI."
              }, 
              field: {
                "zh-CN": "人工智能（伦理AI、生成式AI）。",
                "en": "Artificial Intelligence (Ethical AI, Generative AI)."
              }, 
              remarks: {
                "zh-CN": "在微软领导Copilot等消费级AI产品开发。",
                "en": "Leads the development of consumer-grade AI products like Copilot at Microsoft."
              } 
            },
            { id: "david_silver", name: "David Silver", 
              contribution: {
                "zh-CN": "Google DeepMind首席研究员，领导AlphaGo与AlphaZero的开发，推动AI在复杂决策任务中的应用。",
                "en": "Lead researcher at Google DeepMind, spearheaded AlphaGo and AlphaZero development, advanced AI applications in complex decision-making tasks."
              }, 
              field: {
                "zh-CN": "人工智能（强化学习、深度学习）。",
                "en": "Artificial Intelligence (Reinforcement Learning, Deep Learning)."
              }, 
              remarks: {
                "zh-CN": "其强化学习研究对AI理论和学术影响力显著。",
                "en": "His reinforcement learning research has significant theoretical and academic influence on AI."
              } 
            },
            { id: "marc_benioff", name: "Marc Benioff", 
              contribution: {
                "zh-CN": "Salesforce首席执行官，推动Agentforce平台，将AI融入企业CRM，倡导AI商业化与社会责任。",
                "en": "CEO of Salesforce, pushed the Agentforce platform, integrating AI into enterprise CRM, advocating for AI commercialization and social responsibility."
              }, 
              field: {
                "zh-CN": "人工智能（企业AI、CRM）。",
                "en": "Artificial Intelligence (Enterprise AI, CRM)."
              }, 
              remarks: {
                "zh-CN": "通过Salesforce将AI应用于企业数字化转型。",
                "en": "Applies AI to enterprise digital transformation through Salesforce."
              } 
            },
            { id: "hartmut_neven", name: "Hartmut Neven", 
              contribution: {
                "zh-CN": "Google量子AI实验室主任，领导量子计算研究，推动量子优越性与AI算法优化。",
                "en": "Director of Google's Quantum AI Lab, leads quantum computing research, promotes quantum supremacy and AI algorithm optimization."
              }, 
              field: {
                "zh-CN": "量子计算、人工智能。",
                "en": "Quantum Computing, Artificial Intelligence."
              }, 
              remarks: {
                "zh-CN": "Google在量子计算领域的核心人物，探索AI与量子交叉应用。",
                "en": "A key figure in Google's quantum computing efforts, exploring the intersection of AI and quantum."
              } 
            },
            { id: "yoshua_bengio", name: "Yoshua Bengio", 
              contribution: {
                "zh-CN": "AI“教父”，蒙 Quebec人工智能研究所（Mila）创始人，2018年图灵奖得主，研究深度学习与AI伦理。",
                "en": "AI 'Godfather', founder of Quebec Artificial Intelligence Institute (Mila), Turing Award laureate (2018), researches deep learning and AI ethics."
              }, 
              field: {
                "zh-CN": "人工智能（深度学习、伦理AI）。",
                "en": "Artificial Intelligence (Deep Learning, Ethical AI)."
              }, 
              remarks: {
                "zh-CN": "与Hinton、LeCun齐名，推动负责任AI发展。",
                "en": "On par with Hinton and LeCun, promotes responsible AI development."
              } 
            },
            { id: "john_preskill", name: "John Preskill", 
              contribution: {
                "zh-CN": "加州理工学院教授，量子计算理论先驱，提出“量子优越性”概念，领导量子信息科学研究。",
                "en": "Professor at Caltech, pioneer of quantum computing theory, coined the term 'quantum supremacy', leads research in quantum information science."
              }, 
              field: {
                "zh-CN": "量子计算、量子信息。",
                "en": "Quantum Computing, Quantum Information."
              }, 
              remarks: {
                "zh-CN": "填补量子计算理论领域的空白，影响全球量子技术发展。",
                "en": "Fills gaps in quantum computing theory, influencing global quantum technology development."
              } 
            },
            { id: "daphne_koller", name: "Daphne Koller", 
              contribution: {
                "zh-CN": "斯坦福大学教授，Coursera联合创始人，研究概率模型与生物AI，开发AI驱动的药物发现平台。",
                "en": "Stanford University Professor, Coursera co-founder, researches probabilistic models and bio-AI, developed an AI-driven drug discovery platform."
              }, 
              field: {
                "zh-CN": "人工智能（概率AI、生物计算）。",
                "en": "Artificial Intelligence (Probabilistic AI, Bio-computation)."
              }, 
              remarks: {
                "zh-CN": "在AI与生物计算交叉领域具有开创性贡献。",
                "en": "Has pioneering contributions in the intersection of AI and bio-computation."
              } 
            },
            { id: "jack_hidary", name: "Jack Hidary", 
              contribution: {
                "zh-CN": "SandboxAQ首席执行官，领导量子计算与AI在医疗、材料科学的应用，著有《量子计算：商业指南》。",
                "en": "CEO of SandboxAQ, leads the application of quantum computing and AI in healthcare and materials science, author of 'Quantum Computing: A Business Guide'."
              }, 
              field: {
                "zh-CN": "量子计算、人工智能。",
                "en": "Quantum Computing, Artificial Intelligence."
              }, 
              remarks: {
                "zh-CN": "推动量子计算的商业化，填补产业应用空白。",
                "en": "Promotes the commercialization of quantum computing, filling gaps in industrial applications."
              } 
            },
            { id: "chris_monroe", name: "Chris Monroe", 
              contribution: {
                "zh-CN": "IonQ联合创始人，量子计算硬件先驱，开发基于离子阱的量子计算机，推动量子计算产业化。",
                "en": "Co-founder of IonQ, quantum computing hardware pioneer, developed ion-trap based quantum computers, promotes quantum computing industrialization."
              }, 
              field: {
                "zh-CN": "量子计算（硬件）。",
                "en": "Quantum Computing (Hardware)."
              }, 
              remarks: {
                "zh-CN": "量子计算硬件领域的领军人物，补充硬件开发视角。",
                "en": "A leading figure in quantum computing hardware, supplementing the hardware development perspective."
              } 
            },
            { id: "ben_goertzel", name: "Ben Goertzel", 
              contribution: {
                "zh-CN": "SingularityNET首席执行官，倡导去中心化AI与AGI，推广“人工通用智能”概念，探索AI与区块链融合。",
                "en": "CEO of SingularityNET, advocates for decentralized AI and AGI, promotes the concept of 'Artificial General Intelligence', explores the integration of AI and blockchain."
              }, 
              field: {
                "zh-CN": "人工智能（AGI、去中心化AI）。",
                "en": "Artificial Intelligence (AGI, Decentralized AI)."
              }, 
              remarks: {
                "zh-CN": "代表去中心化AI的先锋视角，补充AGI多样性。",
                "en": "Represents a pioneering perspective on decentralized AI, adding to the diversity of AGI discussions."
              } 
            }
        ];
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
            }
        ];
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
        
        const allData = {
            aiQuantum: aiQuantumMasters,
            finance: financeMasters,
            chinaEntrepreneurs: chinaEntrepreneurs
        };
