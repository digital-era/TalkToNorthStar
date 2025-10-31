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
