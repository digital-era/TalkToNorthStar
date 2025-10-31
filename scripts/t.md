        // --- Data (Modified to include English translations for contribution, field, remarks) ---
        const aiMasters = [
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
            { id: "mark_zuckerberg", name: "Mark Zuckerberg", 
              contribution: {
                "zh-CN": "Meta创始人兼首席执行官，领导Llama开源模型开发，推动开放源AI与Meta AI助手，2025年投资600亿美元推进AI基础设施。",
                "en": "Founder and CEO of Meta, leads Llama open-source model development, promotes open-source AI and Meta AI assistant, invested $60 billion in AI infrastructure in 2025."
              }, 
              field: {
                "zh-CN": "人工智能（开源AI、生成式AI）、社交平台。",
                "en": "Artificial Intelligence (Open-Source AI, Generative AI), Social Platforms."
              }, 
              remarks: {
                "zh-CN": "通过Llama系列模型影响全球AI生态，强调开源AI的长期优势。",
                "en": "Influences global AI ecosystem through Llama series, emphasizes long-term advantages of open-source AI."
              } 
            },
            { id: "jeff_bezos", name: "Jeff Bezos",
              contribution: {
                "zh-CN": "亚马逊创始人，创建AWS奠定AI云计算基础，投资AI创新，推动Alexa和企业AI工具的早期发展。",
                "en": "Founder of Amazon, established AWS as the foundation for AI cloud computing, invested in AI innovation, drove early development of Alexa and enterprise AI tools."
              },
              field: {
                "zh-CN": "人工智能（云计算、语音AI）、电子商务。",
                "en": "Artificial Intelligence (Cloud Computing, Voice AI), E-commerce."
              },
              remarks: {
                "zh-CN": "通过AWS和Alexa为AI的商业化和普及奠定了基础，影响全球科技生态。",
                "en": "Laid the groundwork for AI commercialization and adoption through AWS and Alexa, shaping the global tech ecosystem."
              }
            },
            { id: "larry_ellison", name: "Larry Ellison",
              contribution: {
                "zh-CN": "Oracle创始人，领导Oracle数据库和云基础设施发展，推动AI驱动的企业解决方案和云端数据管理。",
                "en": "Founder of Oracle, led development of Oracle databases and cloud infrastructure, advancing AI-driven enterprise solutions and cloud data management."
              },
              field: {
                "zh-CN": "人工智能（企业AI、云数据库）、企业软件。",
                "en": "Artificial Intelligence (Enterprise AI, Cloud Databases), Enterprise Software."
              },
              remarks: {
                "zh-CN": "Oracle的数据库和云服务为AI驱动的企业数字化转型提供了关键技术支持。",
                "en": "Oracle's databases and cloud services provide critical technical support for AI-driven enterprise digital transformation."
              }
            },
            { id: "bill_gates", name: "Bill Gates",
              contribution: {
                "zh-CN": "微软创始人，通过Microsoft Azure云平台与OpenAI合作，推动AI在全球企业与开发者的普及与应用。",
                "en": "Founder of Microsoft, promotes AI adoption among global enterprises and developers via Microsoft Azure and OpenAI partnership."
              },
              field: {
                "zh-CN": "人工智能（企业AI、云平台）、全球健康与教育投资。",
                "en": "Artificial Intelligence (Enterprise AI, Cloud Platforms), Global Health and Education Investment."
              },
              remarks: {
                "zh-CN": "Azure AI基础设施与Copilot系列产品显著加速了生产力工具的智能化转型。",
                "en": "Azure AI infrastructure and Copilot series significantly accelerate the intelligent transformation of productivity tools."
              }
            },
            { id: "brett_adcock", name: "Brett Adcock",
              contribution: {
                "zh-CN": "Figure AI首席执行官，领导人形机器人Figure 01/02开发，目标实现通用人工智能机器人商业化。",
                "en": "CEO of Figure AI, leads development of humanoid robots Figure 01/02, aiming for commercialization of general-purpose AI robots."
              },
              field: {
                "zh-CN": "人工智能（具身智能、人形机器人）、机器人创业。",
                "en": "Artificial Intelligence (Embodied Intelligence, Humanoid Robotics), Robotics Entrepreneurship."
              },
              remarks: {
                "zh-CN": "Figure AI获OpenAI、Microsoft、NVIDIA等巨额投资，标志着具身AI进入加速发展阶段。",
                "en": "Figure AI secured major investments from OpenAI, Microsoft, NVIDIA, marking the acceleration of embodied AI development."
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
            { id: "kevin_kelly", name: "Kevin Kelly", 
              contribution: {
                "zh-CN": "《连线》杂志创始人，预测AI奇点与镜像世界，著《必然》推动技术哲学与未来学研究。",
                "en": "Founder of Wired magazine, predicted AI singularity and mirrorworld, authored The Inevitable, advancing tech philosophy and futurism."
              }, 
              field: {
                "zh-CN": "人工智能（未来学、技术哲学）。",
                "en": "Artificial Intelligence (Futurism, Tech Philosophy)."
              }, 
              remarks: {
                "zh-CN": "技术乐观主义代表，桥接AI与人文长期愿景。",
                "en": "Tech optimism leader, bridging AI with long-term human vision."
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
            { id: "edwin_chen", name: "Edwin Chen", 
              contribution: {
                "zh-CN": "Surge AI创始人兼首席执行官，专注于高质量数据标注，服务于OpenAI等公司，推动AI模型训练的数据质量革命。",
                "en": "Founder and CEO of Surge AI, focused on high-quality data annotation, serving companies like OpenAI, driving a data quality revolution for AI model training."
              }, 
              field: {
                "zh-CN": "人工智能（数据标注、自然语言处理）、技术创业。",
                "en": "Artificial Intelligence (Data Annotation, Natural Language Processing), Tech Entrepreneurship."
              }, 
              remarks: {
                "zh-CN": "通过自筹资金模式带领Surge AI实现快速增长，2025年拒绝多家收购提议，强调智能数据对AGI的重要性。",
                "en": "Led Surge AI to rapid growth through a bootstrapped model, rejected acquisition offers in 2025, emphasizing the importance of intelligent data for AGI."
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
            { id: "ali_ghodsi", name: "Ali Ghodsi",
                contribution: {
                "zh-CN": "Databricks联合创始人兼首席执行官，Apache Spark共同创造者，推动数据湖仓架构，赋能企业可扩展AI解决方案。",
                "en": "Co-founder and CEO of Databricks, co-creator of Apache Spark, driving the data lakehouse architecture, empowering enterprises with scalable AI solutions."
                },
                field: {
                "zh-CN": "人工智能（大数据分析、机器学习平台）、技术创业。",
                "en": "Artificial Intelligence (Big Data Analytics, Machine Learning Platforms), Tech Entrepreneurship."
                },
                remarks: {
                "zh-CN": "Databricks已成为AI基础设施的基石，2025年估值超过600亿美元。",
                "en": "Databricks has become a cornerstone for AI infrastructure, valued at over $60 billion in 2025."
                }
             },
             { id: "bill_mcdermott", name: "Bill McDermott",
                contribution: {
                "zh-CN": "ServiceNow首席执行官，将AI集成到企业工作流中，推动智能自动化和数字转型，领导多个AI创新阶段。",
                "en": "CEO of ServiceNow, integrated AI into enterprise workflows, advancing intelligent automation and digital transformation, leading through multiple phases of AI innovation."
                },
                field: {
                "zh-CN": "人工智能（企业AI、工作流自动化）、企业软件。",
                "en": "Artificial Intelligence (Enterprise AI, Workflow Automation), Enterprise Software."
                },
                remarks: {
                "zh-CN": "在其领导下，ServiceNow已成为AI驱动服务管理的领导者，影响全球企业。",
                "en": "Under his leadership, ServiceNow has become a leader in AI-powered service management, impacting global businesses."
                }
             },
            { id: "sridhar_ramaswamy", name: "Sridhar Ramaswamy",
                contribution: {
                "zh-CN": "Snowflake首席执行官，前Neeva联合创始人，推动数据云平台用于AI和分析，前Google高管领导搜索和广告。",
                "en": "CEO of Snowflake, former co-founder of Neeva, advancing data cloud platforms for AI and analytics, former Google executive leading search and advertising."
                },
                field: {
                "zh-CN": "人工智能（数据云、搜索AI）、技术领导。",
                "en": "Artificial Intelligence (Data Cloud, Search AI), Tech Leadership."
                },
                remarks: {
                "zh-CN": "领导Snowflake的AI举措，使企业能够利用数据进行AI应用。",
                "en": "Leading Snowflake's AI initiatives, enabling enterprises to leverage data for AI applications."
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

        const QuantumMasters = [
            { id: "max_planck", name: "Max Planck", 
              contribution: {
                "zh-CN": "提出能量量子化假设，引入普朗克常数，奠定量子理论基础，获1918年诺贝尔物理学奖。",
                "en": "Proposed energy quantization hypothesis, introduced Planck's constant, laid foundation for quantum theory, won 1918 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子理论、黑体辐射。",
                "en": "Quantum Theory, Blackbody Radiation."
              }, 
              remarks: {
                "zh-CN": "量子力学的奠基人，开启现代物理学新篇章。",
                "en": "Founder of quantum mechanics, opened a new chapter in modern physics."
              } 
            },
            { id: "albert_einstein", name: "Albert Einstein", 
              contribution: {
                "zh-CN": "解释光电效应，提出光量子（光子）概念，获1921年诺贝尔物理学奖，对量子力学持怀疑态度。",
                "en": "Explained photoelectric effect, proposed photon concept, won 1921 Nobel Prize in Physics, skeptical of quantum mechanics."
              }, 
              field: {
                "zh-CN": "量子理论、光电效应。",
                "en": "Quantum Theory, Photoelectric Effect."
              }, 
              remarks: {
                "zh-CN": "量子理论的先驱，挑战量子力学随机性。",
                "en": "Pioneer of quantum theory, challenged quantum mechanics' randomness."
              } 
            },
            { id: "niels_bohr", name: "Niels Bohr", 
              contribution: {
                "zh-CN": "提出量子原子模型，解释原子能级与辐射光谱，创立哥本哈根解释，获1922年诺贝尔物理学奖。",
                "en": "Proposed quantum atomic model, explained atomic energy levels and spectra, founded Copenhagen interpretation, won 1922 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、原子物理。",
                "en": "Quantum Mechanics, Atomic Physics."
              }, 
              remarks: {
                "zh-CN": "量子力学理论核心人物，与爱因斯坦展开著名辩论。",
                "en": "Central figure in quantum mechanics theory, engaged in famous debates with Einstein."
              } 
            },
            { id: "werner_heisenberg", name: "Werner Heisenberg", 
              contribution: {
                "zh-CN": "发明矩阵力学，提出不确定性原理，奠定量子力学基础，获1932年诺贝尔物理学奖。",
                "en": "Developed matrix mechanics, proposed uncertainty principle, laid foundation for quantum mechanics, won 1932 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、矩阵力学。",
                "en": "Quantum Mechanics, Matrix Mechanics."
              }, 
              remarks: {
                "zh-CN": "量子力学理论的奠基人，影响深远。",
                "en": "Founder of quantum mechanics theory, profoundly influential."
              } 
            },
            { id: "erwin_schrodinger", name: "Erwin Schrödinger", 
              contribution: {
                "zh-CN": "提出薛定谔方程和波函数，描述物质波，提出薛定谔猫思想实验，获1933年诺贝尔物理学奖。",
                "en": "Proposed Schrödinger equation and wave function, described matter waves, introduced Schrödinger's cat, won 1933 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、波动力学。",
                "en": "Quantum Mechanics, Wave Mechanics."
              }, 
              remarks: {
                "zh-CN": "量子力学波动理论的奠基人，影响宏观与微观连接。",
                "en": "Founder of quantum wave mechanics, influenced macro-micro connections."
              } 
            },
            { id: "louis_de_broglie", name: "Louis de Broglie", 
              contribution: {
                "zh-CN": "提出物质波假说，统一波粒二象性，奠定量子力学基础，获1929年诺贝尔物理学奖。",
                "en": "Proposed matter wave hypothesis, unified wave-particle duality, laid foundation for quantum mechanics, won 1929 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、物质波。",
                "en": "Quantum Mechanics, Matter Waves."
              }, 
              remarks: {
                "zh-CN": "波粒二象性的开创者，后反对量子力学主流解释。",
                "en": "Pioneer of wave-particle duality, later opposed mainstream quantum mechanics."
              } 
            },
            { id: "max_born", name: "Max Born", 
              contribution: {
                "zh-CN": "提出波函数概率解释，奠定哥本哈根解释基础，获1954年诺贝尔物理学奖。",
                "en": "Proposed probabilistic interpretation of wave function, foundational to Copenhagen interpretation, won 1954 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、概率解释。",
                "en": "Quantum Mechanics, Probabilistic Interpretation."
              }, 
              remarks: {
                "zh-CN": "量子力学概率理论的奠基人，影响深远。",
                "en": "Founder of quantum mechanics' probabilistic theory, profoundly influential."
              } 
            },
            { id: "wolfgang_pauli", name: "Wolfgang Pauli", 
              contribution: {
                "zh-CN": "提出泡利不相容原理，解释电子排列与化学现象，获1945年诺贝尔物理学奖。",
                "en": "Proposed Pauli exclusion principle, explained electron arrangement and chemical phenomena, won 1945 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、原子物理。",
                "en": "Quantum Mechanics, Atomic Physics."
              }, 
              remarks: {
                "zh-CN": "哥本哈根学派核心人物，奠定化学与量子理论基础。",
                "en": "Core figure in Copenhagen school, foundational to chemistry and quantum theory."
              } 
            },
            { id: "paul_dirac", name: "Paul Dirac", 
              contribution: {
                "zh-CN": "提出狄拉克方程，融合量子力学与相对论，预测反物质，获1933年诺贝尔物理学奖。",
                "en": "Proposed Dirac equation, merged quantum mechanics with relativity, predicted antimatter, won 1933 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子力学、相对论。",
                "en": "Quantum Mechanics, Relativity."
              }, 
              remarks: {
                "zh-CN": "量子力学与相对论结合的先驱，发现正电子。",
                "en": "Pioneer in combining quantum mechanics and relativity, discovered positron."
              } 
            },

            { id: "john_von_neumann", name: "John von Neumann", 
              contribution: {
                "zh-CN": "发展量子力学数学框架，提出密度矩阵与算符理论，奠定量子测量基础。",
                "en": "Developed quantum mechanics' mathematical framework, proposed density matrix and operator theory, foundational to quantum measurement."
              }, 
              field: {
                "zh-CN": "量子力学、数学物理。",
                "en": "Quantum Mechanics, Mathematical Physics."
              }, 
              remarks: {
                "zh-CN": "量子理论形式化的先驱，影响计算与物理学交叉。",
                "en": "Pioneer of quantum theory formalization, impacted computing and physics."
              } 
            },
            { id: "bernhard_riemann", name: "Bernhard Riemann", 
              contribution: {
                "zh-CN": "提出黎曼几何与黎曼猜想，为量子场论和广义相对论提供数学基础。",
                "en": "Proposed Riemann geometry and Riemann hypothesis, providing mathematical foundations for quantum field theory and general relativity."
              }, 
              field: {
                "zh-CN": "数学物理、黎曼几何。",
                "en": "Mathematical Physics, Riemann Geometry."
              }, 
              remarks: {
                "zh-CN": "数学与量子理论的桥梁，影响现代物理学发展。",
                "en": "Bridge between mathematics and quantum theory, shaped modern physics."
              } 
            },
            { id: "richard_feynman", name: "Richard Feynman", 
              contribution: {
                "zh-CN": "提出量子电动力学与路径积分，发明费曼图，获1965年诺贝尔物理学奖。",
                "en": "Developed quantum electrodynamics and path integral formulation, invented Feynman diagrams, won 1965 Nobel Prize in Physics."
              }, 
              field: {
                "zh-CN": "量子电动力学、理论物理。",
                "en": "Quantum Electrodynamics, Theoretical Physics."
              }, 
              remarks: {
                "zh-CN": "量子力学教学与研究的革新者，提出量子计算概念。",
                "en": "Innovator in quantum mechanics teaching, proposed quantum computing."
              } 
            },
            { id: "james_clerk_maxwell", name: "James Clerk Maxwell", 
              contribution: {
                "zh-CN": "建立电磁场理论，统一电与磁，奠定量子场论与光量子研究基础。",
                "en": "Formulated electromagnetic field theory, unified electricity and magnetism, foundational to quantum field theory."
              }, 
              field: {
                "zh-CN": "电磁学、量子场论。",
                "en": "Electromagnetism, Quantum Field Theory."
              }, 
              remarks: {
                "zh-CN": "经典电磁学的奠基人，启发量子理论发展。",
                "en": "Founder of classical electromagnetism, inspired quantum theory."
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

        const literatureMasters = [
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
        
        const allData = {
            ai: aiMasters,
            quantum: QuantumMasters,
            finance: financeMasters,
            literature: literatureMasters,
            art: artMasters,
            chinaEntrepreneurs: chinaEntrepreneurs
        };
