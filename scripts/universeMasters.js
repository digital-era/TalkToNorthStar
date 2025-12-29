const universeMasters = [
  { id: "galileo_galilei", name: "Galileo Galilei",
    contribution: {
      "zh-CN": "首位系统使用望远镜进行天文观测，发现木星卫星、金星相位、太阳黑子等，为日心说提供直接观测证据。",
      "en": "First to systematically use the telescope for astronomical observations; discovered Jupiter's moons, phases of Venus, sunspots, providing direct evidence for heliocentrism."
    },
    field: {
      "zh-CN": "观测天文学、行星物理。",
      "en": "Observational Astronomy, Planetary Physics."
    },
    remarks: {
      "zh-CN": "标志着天文学从哲学思辨转向实证科学，奠定现代观测天文学基础。",
      "en": "Marked the transition of astronomy from philosophical speculation to empirical science, establishing the foundation of modern observational astronomy."
    }
  },
  { id: "johannes_kepler", name: "Johannes Kepler",
    contribution: {
      "zh-CN": "制定行星运动三定律（椭圆轨道、面积定律、周期定律），取代古老圆周运动模型。",
      "en": "Formulated the three laws of planetary motion (elliptical orbits, area law, harmonic law), replacing ancient circular motion models."
    },
    field: {
      "zh-CN": "天体力学、行星轨道理论。",
      "en": "Celestial Mechanics, Planetary Orbit Theory."
    },
    remarks: {
      "zh-CN": "将天文学从几何描述转向物理规律，为牛顿万有引力定律奠定数学基础。",
      "en": "Transformed astronomy from geometric description to physical laws, laying the mathematical foundation for Newton's law of universal gravitation."
    }
  },
  { id: "isaac_newton", name: "Isaac Newton",
    contribution: {
      "zh-CN": "建立万有引力定律与运动三大定律，首次从物理原理统一解释天体运动。",
      "en": "Established the law of universal gravitation and three laws of motion, first unifying explanation of celestial motion from physical principles."
    },
    field: {
      "zh-CN": "天体力学、引力理论。",
      "en": "Celestial Mechanics, Gravitational Theory."
    },
    remarks: {
      "zh-CN": "将天文学置于坚实的数学-物理框架中，其贡献超越天文学，奠定经典力学基础。",
      "en": "Placed astronomy on a solid mathematical-physical framework; contributions extend beyond astronomy, founding classical mechanics."
    }
  },
  { id: "nicolaus_copernicus", name: "Nicolaus Copernicus",
    contribution: {
      "zh-CN": "提出日心说（《天体运行论》），挑战千年地心说传统。",
      "en": "Proposed the heliocentric model (De revolutionibus orbium coelestium), challenging the millennium-old geocentric tradition."
    },
    field: {
      "zh-CN": "宇宙模型、天文学思想革命。",
      "en": "Cosmological Models, Astronomical Thought Revolution."
    },
    remarks: {
      "zh-CN": "引发科学革命，被视为现代天文学思想起点，几乎所有后续重大发现均建立在此基础上。",
      "en": "Triggered the Scientific Revolution; regarded as the starting point of modern astronomical thought, nearly all subsequent major discoveries built upon it."
    }
  },
  { id: "edwin_hubble", name: "Edwin Hubble",
    contribution: {
      "zh-CN": "证明存在银河系外星系，发现宇宙膨胀（哈勃定律），奠定现代大爆炸宇宙学基础。",
      "en": "Proved the existence of galaxies beyond the Milky Way; discovered cosmic expansion (Hubble's law), establishing the foundation of modern Big Bang cosmology."
    },
    field: {
      "zh-CN": "宇宙学、星系天文学。",
      "en": "Cosmology, Extragalactic Astronomy."
    },
    remarks: {
      "zh-CN": "将人类宇宙观从单一银河系扩展至动态、多星系宇宙。",
      "en": "Expanded humanity's view of the universe from a single Milky Way to a dynamic, multi-galaxy cosmos."
    }
  },
  { id: "tycho_brahe", name: "Tycho Brahe",
    contribution: {
      "zh-CN": "望远镜发明前进行史上最精密裸眼观测，积累高精度行星位置数据。",
      "en": "Conducted the most precise naked-eye observations in history before the telescope; accumulated high-precision planetary position data."
    },
    field: {
      "zh-CN": "精密观测天文学。",
      "en": "Precision Observational Astronomy."
    },
    remarks: {
      "zh-CN": "观测数据直接促成开普勒定律制定，被视为观测天文学巅峰。",
      "en": "Observational data directly enabled Kepler's laws; regarded as the pinnacle of pre-telescope observational astronomy."
    }
  },
  { id: "william_herschel", name: "William Herschel",
    contribution: {
      "zh-CN": "发现天王星、红外辐射，首次系统研究星系结构与银河系形状。",
      "en": "Discovered Uranus and infrared radiation; first systematic study of galactic structure and the shape of the Milky Way."
    },
    field: {
      "zh-CN": "恒星天文学、深空巡天。",
      "en": "Stellar Astronomy, Deep-Sky Survey."
    },
    remarks: {
      "zh-CN": "开创恒星天文学与深空巡天传统，推动对银河系外部结构的认识。",
      "en": "Pioneered stellar astronomy and deep-sky surveying, advancing understanding of structures beyond the Milky Way."
    }
  },
  { id: "roger_penrose", name: "Roger Penrose",
    contribution: {
      "zh-CN": "证明黑洞形成是广义相对论的稳健预测，提出循环共形宇宙学（CCC），2020年诺贝尔物理学奖得主。",
      "en": "Proved black hole formation is a robust prediction of general relativity; proposed Conformal Cyclic Cosmology (CCC); 2020 Nobel Prize in Physics laureate."
    },
    field: {
      "zh-CN": "理论宇宙学、黑洞物理、广义相对论。",
      "en": "Theoretical Cosmology, Black Hole Physics, General Relativity."
    },
    remarks: {
      "zh-CN": "当代在世最伟大的理论天文学家之一，对黑洞与宇宙整体结构具有革命性贡献。",
      "en": "One of the greatest living theoretical astronomers; revolutionary contributions to black holes and the overall structure of the universe."
    }
  },
  { id: "adam_riess", name: "Adam Riess",
    contribution: {
      "zh-CN": "通过Ia型超新星观测发现宇宙加速膨胀（暗能量证据），2011年诺贝尔物理学奖得主，目前领导Hubble常数精密测量。",
      "en": "Discovered the accelerating expansion of the universe via Type Ia supernovae (evidence for dark energy); 2011 Nobel Prize in Physics laureate; currently leads precision measurements of the Hubble constant."
    },
    field: {
      "zh-CN": "观测宇宙学、超新星宇宙距离测量。",
      "en": "Observational Cosmology, Supernova Distance Measurement."
    },
    remarks: {
      "zh-CN": "在当代宇宙学最大争议（Hubble常数张力）中处于全球最前沿。",
      "en": "At the forefront of the largest contemporary cosmological controversy (Hubble tension)."
    }
  },
  { id: "sandra_faber", name: "Sandra Faber",
    contribution: {
      "zh-CN": "提出Faber-Jackson关系等星系尺度律，推动冷暗物质模型与ΛCDM标准宇宙模型形成，2020年代仍具深远影响。",
      "en": "Proposed the Faber-Jackson relation and other galaxy scaling laws; advanced cold dark matter models and the ΛCDM standard cosmological model; enduring influence into the 2020s."
    },
    field: {
      "zh-CN": "星系形成与演化、大尺度结构。",
      "en": "Galaxy Formation and Evolution, Large-Scale Structure."
    },
    remarks: {
      "zh-CN": "观测宇宙学传奇人物，对星系物理与宇宙暗物质研究具有奠基性贡献。",
      "en": "Legendary figure in observational cosmology; foundational contributions to galaxy physics and cosmic dark matter research."
    }
  },
{ id: "jacques_yves_cousteau", name: "Jacques-Yves Cousteau",
    contribution: {
      "zh-CN": "共同发明Aqua-Lung水肺呼吸器，推动水下摄影与纪录片革命；领导Calypso号全球深海探险，提升公众海洋意识。",
      "en": "Co-invented the Aqua-Lung scuba apparatus; pioneered underwater photography and documentary filmmaking; led global deep-sea expeditions aboard Calypso, greatly raising public ocean awareness."
    },
    field: {
      "zh-CN": "海洋探索、水下技术、海洋保护。",
      "en": "Ocean Exploration, Underwater Technology, Marine Conservation."
    },
    remarks: {
      "zh-CN": "被誉为现代海洋探索与保护之父，其作品极大推动了全球海洋科普与环境保护运动。",
      "en": "Regarded as the father of modern ocean exploration and conservation; his works significantly advanced global marine education and protection efforts."
    }
  },
  { id: "sylvia_earle", name: "Sylvia Earle",
    contribution: {
      "zh-CN": "完成数千小时水下探索，创多项女性深潜纪录；前NOAA首席科学家，持续倡导海洋保护区建立。",
      "en": "Completed thousands of hours of underwater exploration, set multiple women's deep-diving records; former NOAA Chief Scientist, advocates for marine protected areas."
    },
    field: {
      "zh-CN": "海洋生物学、深海探索、海洋保护。",
      "en": "Marine Biology, Deep-Sea Exploration, Ocean Conservation."
    },
    remarks: {
      "zh-CN": "当代最具影响力的在世海洋学家，被称为'Her Deepness'，对深海生态与可持续性具有持久倡导作用。",
      "en": "One of the most influential living oceanographers, known as 'Her Deepness'; enduring advocacy for deep-sea ecology and sustainability."
    }
  },
  { id: "robert_ballard", name: "Robert Ballard",
    contribution: {
      "zh-CN": "发现泰坦尼克号残骸及多艘著名沉船；开创深海遥控潜水器（ROV）与水下考古技术，发现热液喷口生态系统。",
      "en": "Discovered the Titanic wreck and multiple famous shipwrecks; pioneered deep-sea ROV technology and underwater archaeology; discovered hydrothermal vent ecosystems."
    },
    field: {
      "zh-CN": "深海地质学、水下考古、热液喷口生物学。",
      "en": "Deep-Sea Geology, Underwater Archaeology, Hydrothermal Vent Biology."
    },
    remarks: {
      "zh-CN": "将深海探索与考古相结合，推动深海生态与地质研究的革命性进展。",
      "en": "Combined deep-sea exploration with archaeology, driving revolutionary advances in deep-sea ecology and geology research."
    }
  },
  { id: "john_murray", name: "John Murray",
    contribution: {
      "zh-CN": "领导HMS Challenger号远征（1872–1876），奠定现代海洋学基础，包括深海沉积、洋盆结构与珊瑚礁形成研究。",
      "en": "Led the HMS Challenger Expedition (1872–1876); established the foundations of modern oceanography, including deep-sea sediments, ocean basin structure, and coral reef formation."
    },
    field: {
      "zh-CN": "海洋学、深海沉积学、海洋地质。",
      "en": "Oceanography, Deep-Sea Sedimentology, Marine Geology."
    },
    remarks: {
      "zh-CN": "被视为'海洋学之父'，Challenger远征开创了系统性海洋科学调查时代。",
      "en": "Regarded as the 'father of oceanography'; the Challenger Expedition initiated the era of systematic marine scientific investigation."
    }
  },
  { id: "jacques_piccard_don_walsh", name: "Jacques Piccard & Don Walsh",
    contribution: {
      "zh-CN": "1960年驾驶Trieste号首次载人抵达马里亚纳海沟挑战者深渊（约10,916米），开创人类极端深海探测时代。",
      "en": "In 1960, piloted the Trieste to the first manned descent to Challenger Deep in the Mariana Trench (~10,916 m); opened the era of human extreme deep-sea exploration."
    },
    field: {
      "zh-CN": "极端深海技术、载人深潜器。",
      "en": "Extreme Deep-Sea Technology, Manned Submersibles."
    },
    remarks: {
      "zh-CN": "人类首次触及地球最深处，证明深海载人探索的可行性，对后续深渊任务具有里程碑意义。",
      "en": "First human reach to Earth's deepest point; demonstrated feasibility of manned deep-sea exploration, a milestone for subsequent hadal missions."
    }
  },
  { id: "james_cameron", name: "James Cameron",
    contribution: {
      "zh-CN": "2012年单人驾驶Deepsea Challenger号抵达挑战者深渊（10,898米），开发创新深潜器与3D水下摄影技术。",
      "en": "In 2012, piloted the Deepsea Challenger solo to Challenger Deep (10,898 m); developed innovative submersibles and 3D underwater cinematography technology."
    },
    field: {
      "zh-CN": "深海工程、极端深度探测、海洋纪录片。",
      "en": "Deep-Sea Engineering, Extreme Depth Exploration, Ocean Documentary Filmmaking."
    },
    remarks: {
      "zh-CN": "将深海探索与大众科普相结合，通过电影与技术创新提升全球对深海的关注度。",
      "en": "Integrated deep-sea exploration with public education; elevated global awareness of the deep ocean through film and technological innovation."
    }
  },
  { id: "william_beebe", name: "William Beebe",
    contribution: {
      "zh-CN": "1930年代使用Bathysphere进行首批深海载人观测，首次目击深渊生物。",
      "en": "In the 1930s, conducted the first manned deep-sea observations using the Bathysphere; first scientist to observe abyssal life in situ."
    },
    field: {
      "zh-CN": "深海生物学、早期深潜技术。",
      "en": "Deep-Sea Biology, Early Deep-Diving Technology."
    },
    remarks: {
      "zh-CN": "奠定深海生物学观测基础，开创人类直接目视深海生态的时代。",
      "en": "Laid the foundation for deep-sea biological observation; inaugurated the era of direct human visual study of abyssal ecosystems."
    }
  },
  { id: "marie_tharp", name: "Marie Tharp",
    contribution: {
      "zh-CN": "与Bruce Heezen合作绘制首张大西洋海底地形图，发现中洋脊裂谷与海底扩张证据，支持板块构造理论。",
      "en": "Collaborated with Bruce Heezen to produce the first scientific map of the Atlantic Ocean floor; discovered the Mid-Atlantic Ridge rift valley and evidence of seafloor spreading, supporting plate tectonics theory."
    },
    field: {
      "zh-CN": "海洋制图、海底地质、板块构造。",
      "en": "Ocean Cartography, Seafloor Geology, Plate Tectonics."
    },
    remarks: {
      "zh-CN": "女性海洋学先驱，其地图工作引发地质学革命，推动对地球内部动态的现代理解。",
      "en": "Pioneering female oceanographer; her maps triggered a revolution in geology, advancing modern understanding of Earth's internal dynamics."
    }
  },
  { id: "matthew_fontaine_maury", name: "Matthew Fontaine Maury",
    contribution: {
      "zh-CN": "绘制首张系统海洋洋流与风图，出版《海洋物理地理》，奠定现代航海与海洋学基础。",
      "en": "Created the first systematic charts of ocean currents and winds; published 'The Physical Geography of the Sea'; established foundations for modern navigation and oceanography."
    },
    field: {
      "zh-CN": "物理海洋学、海洋气象、航海图。",
      "en": "Physical Oceanography, Marine Meteorology, Navigational Charts."
    },
    remarks: {
      "zh-CN": "被誉为'现代海洋学之父'，其工作极大提升了海洋航行效率与科学认知。",
      "en": "Known as the 'father of modern oceanography'; his work greatly improved marine navigation efficiency and scientific understanding."
    }
  },
  { id: "wallace_smith_broecker", name: "Wallace Smith Broecker",
    contribution: {
      "zh-CN": "提出'海洋传送带'理论，揭示深海环流与全球气候的密切关系，对海洋碳循环研究具有奠基性影响。",
      "en": "Proposed the 'ocean conveyor belt' theory; revealed the close relationship between deep-sea circulation and global climate; foundational influence on ocean carbon cycle research."
    },
    field: {
      "zh-CN": "气候海洋学、深海环流、碳循环。",
      "en": "Climate Oceanography, Deep-Sea Circulation, Carbon Cycle."
    },
    remarks: {
      "zh-CN": "其理论深刻影响全球气候变化模型与深海动力学研究。",
      "en": "His theories profoundly influenced global climate change models and deep-sea dynamics research."
    }
  },
  { id: "antonie_van_leeuwenhoek", name: "Antonie van Leeuwenhoek",
    contribution: {
      "zh-CN": "首位使用自制显微镜观察并描述微生物（包括细菌、原生动物和精子），开创微生物世界的直接观测。",
      "en": "First to use homemade microscopes to observe and describe microorganisms (including bacteria, protozoa, and spermatozoa), pioneering direct observation of the microbial world."
    },
    field: {
      "zh-CN": "显微镜技术、微生物发现。",
      "en": "Microscopy, Microbial Discovery."
    },
    remarks: {
      "zh-CN": "被公认为'微生物学之父'，其观察奠定了微生物作为独立研究领域的起点。",
      "en": "Widely regarded as the 'father of microbiology'; his observations established the foundation for microbiology as an independent field."
    }
  },
  { id: "louis_pasteur", name: "Louis Pasteur",
    contribution: {
      "zh-CN": "确立胚芽说，发明巴氏消毒法与狂犬病疫苗，推翻自然发生说。",
      "en": "Established the germ theory of disease; invented pasteurization and the rabies vaccine; disproved spontaneous generation."
    },
    field: {
      "zh-CN": "微生物病原学、免疫学、发酵科学。",
      "en": "Microbial Pathogenesis, Immunology, Fermentation Science."
    },
    remarks: {
      "zh-CN": "奠定现代微生物学与免疫学基础，其工作彻底改变了医学与食品工业。",
      "en": "Laid the foundations of modern microbiology and immunology; his work revolutionized medicine and the food industry."
    }
  },
  { id: "robert_koch", name: "Robert Koch",
    contribution: {
      "zh-CN": "确立科赫法则，首次分离结核杆菌与霍乱弧菌等病原菌。",
      "en": "Established Koch's postulates; first isolated the tuberculosis bacillus and cholera vibrio among other pathogens."
    },
    field: {
      "zh-CN": "细菌学、病原微生物鉴定。",
      "en": "Bacteriology, Pathogen Identification."
    },
    remarks: {
      "zh-CN": "被誉为'细菌学之父'，1905年诺贝尔生理学或医学奖得主，其方法论至今仍是微生物学核心标准。",
      "en": "Known as the 'father of bacteriology'; 1905 Nobel Prize in Physiology or Medicine; his postulates remain a core standard in microbiology."
    }
  },
  { id: "alexander_fleming", name: "Alexander Fleming",
    contribution: {
      "zh-CN": "1928年发现青霉素，开创抗生素时代。",
      "en": "Discovered penicillin in 1928, ushering in the antibiotic era."
    },
    field: {
      "zh-CN": "抗生素发现、感染病治疗。",
      "en": "Antibiotic Discovery, Infectious Disease Treatment."
    },
    remarks: {
      "zh-CN": "1945年诺贝尔生理学或医学奖得主，其发现极大降低了传染病死亡率。",
      "en": "1945 Nobel Prize in Physiology or Medicine; his discovery dramatically reduced mortality from bacterial infections."
    }
  },
  { id: "martinus_willem_beijerinck", name: "Martinus Willem Beijerinck",
    contribution: {
      "zh-CN": "发现首例病毒（烟草花叶病毒），提出'病毒'概念，开创富集培养技术。",
      "en": "Discovered the first virus (tobacco mosaic virus); coined the concept of 'virus'; pioneered enrichment culture techniques."
    },
    field: {
      "zh-CN": "病毒学、土壤微生物学。",
      "en": "Virology, Soil Microbiology."
    },
    remarks: {
      "zh-CN": "其工作奠定病毒学与微生物生态学基础，推动了非细胞病原体的认识。",
      "en": "His work established virology and microbial ecology; advanced understanding of non-cellular pathogens."
    }
  },
  { id: "sergei_winogradsky", name: "Sergei Winogradsky",
    contribution: {
      "zh-CN": "发现化学自养、硝化细菌与硫细菌，发明Winogradsky柱。",
      "en": "Discovered chemolithotrophy, nitrifying and sulfur bacteria; invented the Winogradsky column."
    },
    field: {
      "zh-CN": "微生物生态学、生物地球化学循环。",
      "en": "Microbial Ecology, Biogeochemical Cycles."
    },
    remarks: {
      "zh-CN": "奠定氮、硫循环微生物机制基础，对现代环境微生物学影响深远。",
      "en": "Established microbial mechanisms of nitrogen and sulfur cycles; profound influence on modern environmental microbiology."
    }
  },
  { id: "selman_abraham_waksman", name: "Selman Abraham Waksman",
    contribution: {
      "zh-CN": "发现链霉素及其他土壤抗生素，提出'抗生素'一词。",
      "en": "Discovered streptomycin and other soil antibiotics; coined the term 'antibiotic'."
    },
    field: {
      "zh-CN": "抗生素开发、土壤微生物学。",
      "en": "Antibiotic Development, Soil Microbiology."
    },
    remarks: {
      "zh-CN": "1952年诺贝尔生理学或医学奖得主，推动抗生素工业化生产。",
      "en": "1952 Nobel Prize in Physiology or Medicine; drove the industrialization of antibiotic production."
    }
  },
  { id: "joshua_lederberg", name: "Joshua Lederberg",
    contribution: {
      "zh-CN": "发现细菌遗传重组与接合、转导现象，奠定细菌遗传学基础；1958年诺贝尔生理学或医学奖得主。",
      "en": "Discovered bacterial genetic recombination, conjugation, and transduction; established bacterial genetics; 1958 Nobel Prize in Physiology or Medicine laureate."
    },
    field: {
      "zh-CN": "微生物遗传学、分子生物学。",
      "en": "Microbial Genetics, Molecular Biology."
    },
    remarks: {
      "zh-CN": "其工作将细菌作为遗传学模型，推动基因工程与生物技术革命。",
      "en": "His discoveries made bacteria a key model for genetics; propelled the gene engineering and biotechnology revolution."
    }
  },
  { id: "rita_r_colwell", name: "Rita R. Colwell",
    contribution: {
      "zh-CN": "研究霍乱生态与Vibrio cholerae环境宿主，开发快速检测方法。",
      "en": "Studied cholera ecology and environmental reservoirs of Vibrio cholerae; developed rapid detection methods."
    },
    field: {
      "zh-CN": "环境微生物学、传染病生态。",
      "en": "Environmental Microbiology, Infectious Disease Ecology."
    },
    remarks: {
      "zh-CN": "当代最具影响力的在世微生物学家之一，前美国国家科学基金会主任。",
      "en": "One of the most influential living microbiologists; former Director of the U.S. National Science Foundation."
    }
  },
  { id: "didier_raoult", name: "Didier Raoult",
    contribution: {
      "zh-CN": "领导大规模微生物组与感染病研究，对立克次体与新兴感染病具有重要贡献。",
      "en": "Led large-scale microbiome and infectious disease research; major contributions to rickettsia and emerging infections."
    },
    field: {
      "zh-CN": "临床微生物学、微生物组学。",
      "en": "Clinical Microbiology, Microbiomics."
    },
    remarks: {
      "zh-CN": "H指数极高，其研究推动了感染病诊断与治疗的现代方法。",
      "en": "Extremely high H-index; his research advanced modern approaches to infectious disease diagnosis and treatment."
    }
  }
];
