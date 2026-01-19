const aiMasters = [
    { id: "elon_musk", name: "Elon Musk (马斯克)",
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
    { id: "demis_hassabis", name: "Demis Hassabis (哈萨比斯)",
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
    { id: "jensen_huang", name: "Jensen Huang (黄仁勋)",
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
    { id: "sam_altman", name: "Sam Altman (奥特曼)",
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
    { id: "dario_amodei", name: "Dario Amodei (达里奥·阿莫迪)",
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
    { id: "mark_zuckerberg", name: "Mark Zuckerberg (扎克伯格)",
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
    { id: "steve_jobs", name: "Steve Jobs (乔布斯)",
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
    { id: "jeff_bezos", name: "Jeff Bezos (贝佐斯)",
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
    { id: "larry_ellison", name: "Larry Ellison (拉里·埃里森)",
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
    { id: "bill_gates", name: "Bill Gates (比尔·盖茨)",
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
    { id: "satya_nadella", name: "Satya Nadella (纳德拉)",
      contribution: {
        "zh-CN": "微软首席执行官，领导Azure云平台与OpenAI深度合作，推动Copilot系列产品落地，加速企业级AI与生产力工具智能化。",
        "en": "CEO of Microsoft, leads deep collaboration between Azure cloud platform and OpenAI, drives Copilot series adoption, accelerating enterprise AI and intelligent productivity tools."
      },
      field: {
        "zh-CN": "人工智能（企业AI、云平台、生成式AI）、生产力工具。",
        "en": "Artificial Intelligence (Enterprise AI, Cloud Platform, Generative AI), Productivity Tools."
      },
      remarks: {
        "zh-CN": "通过Azure+OpenAI模式构建全球最广泛的企业AI生态，使微软重新成为AI时代的核心基础设施提供商。",
        "en": "Built the world's most extensive enterprise AI ecosystem through the Azure+OpenAI model, repositioning Microsoft as the core infrastructure provider in the AI era."
      }
    },
    { id: "larry_page", name: "Larry Page (拉里·佩奇)",
      contribution: {
        "zh-CN": "Google联合创始人兼前Alphabet CEO，发明PageRank算法，主导Android、YouTube、DeepMind等战略收购，创建Alphabet架构。",
        "en": "Co-founder of Google and former CEO of Alphabet, invented PageRank algorithm, led strategic acquisitions of Android, YouTube, and DeepMind, established Alphabet structure."
      },
      field: {
        "zh-CN": "人工智能（自动驾驶、生命科学、搜索与广告AI）、前沿科技投资。",
        "en": "Artificial Intelligence (Autonomous Driving, Life Sciences, Search & Advertising AI), Moonshot Technology Investment."
      },
      remarks: {
        "zh-CN": "通过Alphabet X实验室和DeepMind推动AI与量子计算、生物计算的深度融合，是AI长线主义与科学发现型AI的最重要推动者之一。",
        "en": "Through Alphabet X lab and DeepMind, promotes deep integration of AI with quantum computing and bio-computation; one of the most significant advocates of long-termism and science-discovery-oriented AI."
      }
    },
    { id: "sergey_brin", name: "Sergey Brin (谢尔盖·布林)",
      contribution: {
        "zh-CN": "Google联合创始人兼前Alphabet总裁，与拉里·佩奇共同发明PageRank，主导Google Glass、Waymo、Google Brain等前沿项目。",
        "en": "Co-founder of Google and former President of Alphabet, co-invented PageRank with Larry Page, led Google Glass, Waymo, and Google Brain."
      },
      field: {
        "zh-CN": "人工智能（AGI、强化学习、量子AI）、飞行汽车与前沿硬件。",
        "en": "Artificial Intelligence (AGI, Reinforcement Learning, Quantum AI), Flying Cars and Frontier Hardware."
      },
      remarks: {
        "zh-CN": "2023年起重新深度参与Google AI核心研发，被认为是Gemini系列与后AlphaFold时代Google AI战略的幕后关键人物。",
        "en": "Returned to deep involvement in Google AI core R&D since 2023, regarded as the key behind-the-scenes figure in Gemini series and post-AlphaFold era Google AI strategy."
      }
    },
    { id: "sundar_pichai", name: "Sundar Pichai (皮查伊)",
      contribution: {
        "zh-CN": "Google及Alphabet现任首席执行官，领导Chrome、Android、Google Cloud及Gemini大模型开发，推动AI全面融入主流产品。",
        "en": "Current CEO of Google and Alphabet, led development of Chrome, Android, Google Cloud, and Gemini large models, driving comprehensive AI integration into Mainstream products."
      },
      field: {
        "zh-CN": "人工智能（生成式AI、多模态模型、云AI）、搜索与广告、消费级硬件。",
        "en": "Artificial Intelligence (Generative AI, Multimodal Models, Cloud AI), Search & Advertising, Consumer Hardware."
      },
      remarks: {
        "zh-CN": "2023–2025年带领Google成功从搜索时代转型为AI优先公司，使Gemini系列成为与ChatGPT、Claude直接竞争的全球顶级大模型之一。",
        "en": "Led Google's successful transformation from search-first to AI-first company during 2023–2025, establishing Gemini series as one of the world's top large models directly competing with ChatGPT and Claude."
      }
    },
    { id: "john_collison", name: "John Collison (约翰·科里森)",
      contribution: {
        "zh-CN": "Stripe联合创始人兼总裁，构建全球领先的在线支付基础设施，为AI公司与开发者提供关键支付与金融服务，支持AI商业化落地。",
        "en": "Co-founder and President of Stripe, built the world's leading online payment infrastructure, providing critical payment and financial services for AI companies and developers to enable AI commercialization."
      },
      field: {
        "zh-CN": "金融科技、支付基础设施、AI商业化支持。",
        "en": "FinTech, Payment Infrastructure, AI Commercialization Support."
      },
      remarks: {
        "zh-CN": "Stripe已成为几乎所有头部AI公司（OpenAI、Anthropic、xAI等）的支付与资金流核心伙伴，是AI经济不可或缺的底层设施。",
        "en": "Stripe has become the core payment and financial flow partner for nearly all leading AI companies (OpenAI, Anthropic, xAI, etc.), serving as indispensable infrastructure for the AI economy."
      }
    },
    { id: "brett_adcock", name: "Brett Adcock (布雷特·阿德科克)",
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
    { id: "geoffrey_hinton", name: "Geoffrey Hinton (杰弗里·辛顿)",
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
    { id: "ilya_sutskever", name: "Ilya Sutskever (伊利亚·苏茨克弗)",
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
    { id: "ray_kurzweil", name: "Ray Kurzweil (库兹韦尔)",
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
    { id: "kevin_kelly", name: "Kevin Kelly (凯文·凯利)",
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
    { id: "peter_diamandis", name: "Peter Diamandis (彼得·戴曼迪斯)",
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
    { id: "eric_schmidt", name: "Eric Schmidt (埃里克·施密特)",
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
    { id: "edwin_chen", name: "Edwin Chen (陈世轩)",
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
    { id: "jeff_dean", name: "Jeff Dean (杰夫·迪恩)",
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
    { id: "yann_lecun", name: "Yann LeCun (杨立昆)",
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
    { id: "fei_fei_li", name: "Fei-Fei Li (李飞飞)",
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
    { id: "andrej_karpathy", name: "Andrej Karpathy (安德烈·卡帕斯)",
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
    { id: "andrew_ng", name: "Andrew Ng (吴恩达)",
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
    { id: "mustafa_suleyman", name: "Mustafa Suleyman (穆斯塔法·苏莱曼)",
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
    {  id: "josh_woodward", name: "Josh Woodward (乔什·伍德沃德)",
      contribution: {
        "zh-CN": "Google Labs副总裁兼Gemini应用负责人，推动NotebookLM等实验性AI产品爆款化，领导Gemini应用快速产品化。",
        "en": "Vice President of Google Labs and head of the Gemini app, drove viral success of experimental AI products like NotebookLM, led rapid productization of Gemini application。"
      },
      field: {
        "zh-CN": "人工智能（消费级AI产品、实验性AI应用、快速原型开发）。",
        "en": "Artificial Intelligence (Consumer AI Products, Experimental AI Applications, Rapid Prototyping)."
      },
      remarks: {
        "zh-CN": "以极致速度与创业式文化著称，将DeepMind研究成果高效转化为用户可感知产品。",
        "en": "Renowned for extreme velocity and startup-like culture, efficiently converting DeepMind research into tangible user products."
      }
    },
    { id: "david_silver", name: "David Silver (大卫·西尔弗)",
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
    { id: "denny_zhou", name: "Denny Zhou (周登尼)",
      contribution: {
        "zh-CN": "Google DeepMind首席科学家，CoT提示（Chain-of-Thought Prompting）和自一致性（Self-Consistency）方法的先驱，极大增强了LLM的推理能力，对Gemini模型做出基础贡献。",
        "en": "Principal Scientist at Google DeepMind, pioneer of Chain-of-Thought (CoT) Prompting and Self-Consistency methods, significantly enhanced LLM reasoning capabilities, contributed foundational technology to the Gemini model."
      },
      field: {
        "zh-CN": "人工智能（大型语言模型LLM、推理能力、AGI）。",
        "en": "Artificial Intelligence (Large Language Models LLM, Reasoning Capabilities, AGI)."
      },
      remarks: {
        "zh-CN": "推动LLM从模式匹配走向复杂逻辑推理的关键人物之一，累计论文引用量超9万次。",
        "en": "One of the key figures driving LLMs from pattern matching to complex logical reasoning, with over 90k cumulative citations."
      }
    },
    { id: "marc_benioff", name: "Marc Benioff (马克·贝尼奥夫)",
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
    { id: "peter_thiel", name: "Peter Thiel (彼得·蒂尔)",
      contribution: {
        "zh-CN": "Palantir Technologies联合创始人兼董事会主席，推动大数据分析与AI平台在国防、情报与商业领域的应用，早年PayPal联合创始人及Facebook首位外部投资者。",
        "en": "Co-founder and Chairman of Palantir Technologies, advancing big data analytics and AI platforms in defense, intelligence, and commercial sectors; early co-founder of PayPal and first external investor in Facebook."
      },
      field: {
        "zh-CN": "人工智能（大数据分析、机器学习）、风险投资。",
        "en": "Artificial Intelligence (Big Data Analytics, Machine Learning), Venture Capital."
      },
      remarks: {
        "zh-CN": "通过Palantir和Founders Fund塑造AI创业生态，著《从0到1》探讨创新垄断与技术进步。",
        "en": "Shapes the AI startup ecosystem through Palantir and Founders Fund; authored 'Zero to One,' exploring innovation, monopoly, and technological progress."
      }
    },
    { id: "alexander_karp", name: "Alexander Karp (亚历山大·卡普)",
      contribution: {
        "zh-CN": "Palantir Technologies联合创始人兼首席执行官，领导Gotham与Foundry平台的开发，推动AI驱动的数据集成与决策在政府与企业中的应用。",
        "en": "Co-founder and CEO of Palantir Technologies, leads development of Gotham and Foundry platforms, advancing AI-driven data integration and decision-making in government and enterprise."
      },
      field: {
        "zh-CN": "人工智能（数据集成、决策AI）、软件工程。",
        "en": "Artificial Intelligence (Data Integration, Decision AI), Software Engineering."
      },
      remarks: {
        "zh-CN": "以哲学背景指导技术伦理，2025年合著《技术共和国》，探讨AI在国家安全与社会治理中的作用。",
        "en": "Guides technology ethics with a philosophy background; co-authored 'The Technological Republic' in 2025, exploring AI's role in national security and societal governance."
      }
    },
    { id: "ali_ghodsi", name: "Ali Ghodsi (阿里·戈德西)",
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
    { id: "bill_mcdermott", name: "Bill McDermott (比尔·麦克德莫特)",
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
    { id: "sridhar_ramaswamy", name: "Sridhar Ramaswamy (斯里达尔·拉马斯瓦米)",
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
    { id: "yoshua_bengio", name: "Yoshua Bengio (约书亚·本吉奥)",
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
    { id: "daphne_koller", name: "Daphne Koller (达芙妮·科勒)",
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
    { id: "ben_goertzel", name: "Ben Goertzel (本·戈茨尔)",
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
    },
    {id: "dan_koe",   name: "Dan Koe (丹·科)",
      contribution: {
        "zh-CN": "当代一人企业与数字创作者模式的代表人物，推广专注力训练、内容系统化与基于真实自我的可持续在线商业模式。",
        "en": "Leading figure in the one-person business and modern creator economy, author of 'The Art of Focus' and 'Purpose & Profit,' promotes focus training, systematized content creation, and sustainable internet businesses built on authentic self."
      },
      field: {
        "zh-CN": "数字创业（一人企业、内容创作、个人品牌）、自我提升与生产力哲学。",
        "en": "Digital Entrepreneurship (One-Person Business, Content Creation, Personal Branding), Self-Improvement and Productivity Philosophy."
      },
      remarks: {
        "zh-CN": "倡导每日仅需少量专注写作即可构建高利润率在线业务，其体系影响大量追求自主生活与财务自由的创作者和一人企业主。",
        "en": "Advocates building high-margin online businesses through minimal daily focused writing , influencing a large cohort of creators and solopreneurs seeking autonomy and financial freedom."
      }
    },
    {id: "justin_welsh", name: "Justin Welsh (贾斯汀·韦尔什)",
      contribution: {
        "zh-CN": "一人企业主领域最具代表性的实践者，著有内容操作系统课程与模板，推广可复制的社交媒体增长、内容生产与数字产品销售模式。",
        "en": "Most representative practitioner in the solopreneur space; offers courses and templates on replicable social media growth, content production, and digital product sales."
      },
      field: {
        "zh-CN": "数字创业（一人企业、个人品牌、内容创作）、在线教育与创作者变现。",
        "en": "Digital Entrepreneurship (One-Person Business, Content Creation, Personal Branding), Online Education and Creator Monetization."
      },
      remarks: {
        "zh-CN": "以LinkedIn为核心平台，通过课程与模板订阅实现高利润率营收，其务实、可执行的框架被视为个人企业增长的标准教科书。",
        "en": "Centered on LinkedIn with over 750K followers and Newsletter exceeding 250K subscribers, achieves high-margin revenue through courses and template subscriptions (consistently maintaining over 90% profit margins); his practical, executable frameworks are regarded as the standard playbook for solopreneur growth."
      }
},
{id: "alex_hormozi",   name: "Alex Hormozi (亚历克斯·霍莫齐)",
  contribution: {
    "zh-CN": "免费分享高价值内容并销售高客单价课程，推动offer设计、销售漏斗与业务规模化。",
    "en": "Shares high-value free content while selling premium courses, advancing offer engineering, sales funnels, and business scaling."
  },
  field: {
    "zh-CN": "数字创业（一人企业、高利润offer、销售心理学、业务杠杆化）、在线教育与投资。",
    "en": "Digital Entrepreneurship (One-Person Business, Content Creation, Personal BrandingHigh-Margin Offers, Sales Psychology, Business Leverage), Online Education and Investing."
  },
  remarks: {
    "zh-CN": "其书籍与框架影响全球数百万创业者；强调价值先行、杠杆增长与可规模化系统，代表一人/小型团队实现巨额营收的巅峰范式。",
    "en": "Emphasizes value-first approach, leveraged growth, and scalable systems, exemplifying the pinnacle paradigm for achieving massive revenue with solo/small teams."
  }
}     
];
