// src/modes/greenModeConfig.js
export default {
  modeKey: 'green',
  theme: {
    safeBg: '#E6F4EA',
    flagColor: '#0B6A43',
    numberColors: {
      1: '#2e7d32', 2: '#1b5e20', 3: '#43a047', 4: '#00897b',
      5: '#2e7d32', 6: '#00695c', 7: '#1b5e20', 8: '#004d40'
    }
  },
  // 难度对应初始治理预算（与原 Beginner/Intermediate/Expert 对齐）
  budgets: { beginner: 50, intermediate: 80, expert: 100 },
  // 错误标记的“公信度”惩罚
  trustPenalty: 10,           // 误旗一次 -8
  trustMax: 100,             // 初始 100
  // 插旗花费与撤旗返还（鼓励谨慎）
  flagCost: 5,
  unflagRefund: 2,
  // 治理方案（旗子提示文案）
  remedies: [
    { key: 'ccus',     label: 'CCUS Sequestration',     tipId: 'tip_ccus_01' },
    { key: 'pv',       label: 'PV Substitution',        tipId: 'tip_pv_01' },
    { key: 'pipe',     label: 'Pipeline Repair',        tipId: 'tip_pipe_01' },
    { key: 'insul',    label: 'Building Insulation',    tipId: 'tip_insulation_01' }
  ],
  // 轻科普卡池（随机 1 条 3 秒气泡）
  tips: [
    { id: 'tip_ccus_01',       title: 'What is CCUS?',                text: 'CCUS serves hard-to-abate sectors like steel and cement; the core is capture and sequestration.' },
    { id: 'tip_pv_01',         title: 'PV Substitution',              text: 'Distributed PV reduces peak load; LCOE keeps declining annually.' },
    { id: 'tip_pipe_01',       title: 'Pipeline Repair',              text: 'Industrial wastewater leaks often stem from aging networks; targeted repairs are more cost-effective.' },
    { id: 'tip_insulation_01', title: 'Building Insulation',          text: 'Envelope insulation is a low-cost, high-return energy retrofit.' },
    { id: 'tip_ccus_02',       title: 'CCUS Cost',                    text: 'Capture cost depends on flue-gas concentration; cement/steel can be more economical.' },
    { id: 'tip_pv_02',         title: 'Storage Pairing',              text: 'PV + storage raises self-consumption and reduces curtailment.' },
    { id: 'tip_pipe_02',       title: 'Online Monitoring',            text: 'Leak detection uses flow balance and distributed fiber-optic acoustic sensing to catch early leaks.' },
    { id: 'tip_insulation_02', title: 'Thermal Bridge Mitigation',    text: 'Addressing thermal bridges significantly cuts energy use and condensation risk.' },
    { id: 'tip_led_01',        title: 'LED Retrofit',                 text: 'LEDs save 50%+ vs. traditional lighting, with lower maintenance.' },
    { id: 'tip_vfd_01',        title: 'VFD Energy Saving',            text: 'Adding VFDs to fans/pumps supplies as needed; typical savings are 20–40%.' },
    { id: 'tip_steam_01',      title: 'Steam Systems',                text: 'Pipe insulation and condensate recovery can deliver double-digit efficiency gains.' },
    { id: 'tip_motor_01',      title: 'High-Efficiency Motors',       text: 'IE3/IE4 motors’ lifecycle energy savings repay the upfront premium.' },
    { id: 'tip_bems_01',       title: 'Energy Management Systems',    text: 'EMSs help uncover “invisible” sources of waste.' },
    { id: 'tip_dr_01',         title: 'Demand Response',              text: 'Shift load to avoid high-carbon hours and lower bills.' },
    { id: 'tip_heat_01',       title: 'Waste Heat Utilization',       text: 'Low-grade waste heat can serve preheating/space heating to boost overall efficiency.' },
    { id: 'tip_ev_01',         title: 'Transport Electrification',    text: 'Electrifying light-duty transport directly reduces costs and emissions.' },
    { id: 'tip_h2_01',         title: 'Green Hydrogen Applications',  text: 'Best for high-temperature uses and long-duration storage—apply case by case.' },
    { id: 'tip_bio_01',        title: 'Biomass Co-firing',            text: 'Some boilers can rapidly adopt biomass co-firing as a replacement pathway.' },
    { id: 'tip_chiller_01',    title: 'Chiller Plant Optimization',   text: 'Coordinating tower–chiller–pumps can cut plant power by 10–20%.' },
    { id: 'tip_air_01',        title: 'Compressed Air',               text: 'Each 1 bar drop in system pressure saves about 7% energy.' },
    { id: 'tip_methane_01',    title: 'Methane Mitigation',           text: 'On a 20-year horizon methane is much stronger; leak control is highly cost-effective.' },
    { id: 'tip_proc_01',       title: 'Process Substitution',         text: 'Shift from end-of-pipe treatment to process substitution for larger abatement potential.' },
    { id: 'tip_lca_01',        title: 'Life-Cycle Perspective',       text: 'Assess cradle-to-grave footprints to avoid emissions shifting.' },
    { id: 'tip_scope3_01',     title: 'Scope 3 Emissions',            text: 'Supply chains often dominate; green procurement standards are crucial.' }
  ]
}
