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
           { id: "steve_jobs", name: "Steve Jobs",
              contribution: {
                "zh-CN": "苹果公司联合创始人，通过Macintosh、iPod、iPhone、iPad等创新产品，重塑个人计算、数字音乐、智能手机和移动设备行业。",
                "en": "Co-founder of Apple Inc., reshaped personal computing, digital music, smartphones, and mobile device industries through innovative products like Macintosh, iPod, iPhone, and iPad."
              },
              field: {
                "zh-CN": "个人计算、移动技术、用户体验设计、数字娱乐。",
                "en": "Personal Computing, Mobile Technology, User Experience Design, Digital Entertainment."
              },
              remarks: {
                "zh-CN": "乔布斯对简约设计和卓越用户体验的极致追求，为所有科技产品包括AI应用树立了标杆。",
                "en": "Jobs' ultimate pursuit of minimalist design and exceptional user experience set a benchmark for all tech products."
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
            { id: "denny_zhou", name: "Denny Zhou", 
              contribution: {
                "zh-CN": "Google DeepMind首席科学家，CoT提示（Chain-of-Thought Prompting）和自一致性（Self-Consistency）方法的先驱，极大增强了LLM的推理能力，对Gemini模型做出基础贡献。",
                "en": "Principal Scientist at Google DeepMind, pioneer of Chain-of-Thought (CoT) Prompting and Self-Consistency methods, significantly enhanced LLM reasoning capabilities, contributed foundational technology to the Gemini model."
              }, 
              field: {
                "zh-CN": "人工智能（大型语言模型LLM、推理能力、AGI）。",
                "en": "Artificial Intelligence (Large Language Models LLM, Reasoning Capabilities, AGI)."
              }, 
              remarks: {
                "zh-CN": "他的工作是推动LLM从模式匹配走向复杂逻辑推理的关键人物之一，累计论文引用量超9万次。",
                "en": "One of the key figures driving LLMs from pattern matching to complex logical reasoning, with over 90k cumulative citations."
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
