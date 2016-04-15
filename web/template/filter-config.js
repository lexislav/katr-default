
var FilterConfig = [

        {
        type: 'section',
        label: 'Základní zařazení',
        header: true,
        closable: false,
        opened: true,

        fields: [

            
                                                                                                                                
            {
                id: 'vyrobkovarada',
                label: 'Výrobková řada',
                isDisabled: false,

                
                
                                        type: 'dropdown',
                        value: null ,options: [ {label: '- nic -', value: null},
    {label: 'C3', value: 'C3'},    {label: 'M3', value: 'M3'},    {label: 'E3', value: 'E3'},    {label: 'Z', value: 'Z'},    {label: 'ZF', value: 'ZF'},    {label: 'ZL', value: 'ZL'}],                        default: null,
                                                    style: {
                    width: 6,
                                            widthLabel: 2
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'struktura',
                label: 'Kategorie',
                isDisabled: false,

                
                
                                        type: 'dropdown',
                        value: null ,options: [ {label: '- nic -', value: null},
    {label: 'Rámy', value: 'Rámy'},    {label: '-Typ C3', value: 'Typ C3'},    {label: 'Plošné prvky', value: 'Plošné prvky'},    {label: '-Podlaha', value: 'Podlaha'},    {label: '-Stěny', value: 'Stěny'},    {label: '-Fasádní systémy', value: 'Fasádní systémy'},    {label: 'Výplně otvorů', value: 'Výplně otvorů'},    {label: '-Okna', value: 'Okna'},    {label: '-Dveře', value: 'Dveře'},    {label: 'Příslušenství', value: 'Příslušenství'},    {label: '-Schodiště', value: 'Schodiště'}],                        default: null,
                                                    style: {
                    width: 12,
                                            widthLabel: 1
                                    },

                disabled: [ ]
            }            
        ]
    },
        {
        type: 'section',
        label: 'Rozměry',
        header: true,
        closable: true,
        opened: false,

        fields: [

            
                                                                                                                                
            {
                id: 'sirka',
                label: 'Š',
                isDisabled: false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                
                                        type: 'range',
                        min: 600,
                        max: 2990,
                        defaultmin: 600,
                        defaultmax: 2990,
                        options: {
                            floor: 600,
                            ceil: 2990,
                        },

                                                style: {
                    width: 12,
                                            widthLabel: 1
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'vyska',
                label: 'V',
                isDisabled: false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                
                                        type: 'range',
                        min: 450,
                        max: 3650,
                        defaultmin: 450,
                        defaultmax: 3650,
                        options: {
                            floor: 450,
                            ceil: 3650,
                        },

                                                style: {
                    width: 12,
                                            widthLabel: 1
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'hloubka',
                label: 'H (D)',
                isDisabled: false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                
                                        type: 'range',
                        min: 6058,
                        max: 8000,
                        defaultmin: 6058,
                        defaultmax: 8000,
                        options: {
                            floor: 6058,
                            ceil: 8000,
                        },

                                                style: {
                    width: 12,
                                            widthLabel: 1
                                    },

                disabled: [ ]
            }            
        ]
    },
        {
        type: 'section',
        label: 'Základní parametry',
        header: true,
        closable: true,
        opened: true,

        fields: [

            
                                                                                                                                
            {
                id: 'tepelnaOdolnost',
                label: 'U',
                isDisabled: false,

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                
                                        type: 'slider',
                        value: null,
                        default: 3,
                        options: {
                            showTicks: true,
                            stepsArray: [0.614,0.665,0.720,1.1,2.1]
                        },
                                                    style: {
                    width: 6,
                                            widthLabel: 2
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'zvukovyUtlum',
                label: 'Rw',
                isDisabled: false,

                
                
                                        type: 'dropdown',
                        value: null ,options: [ {label: '- nic -', value: null},
    {label: '25', value: '25'},    {label: '42', value: '42'},    {label: '50', value: '50'}],                        default: null,
                                                    style: {
                    width: 6,
                                            widthLabel: 2
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'pozarniOdolnost',
                label: 'Požární odolnost',
                isDisabled: false,

                
                
                                        type: 'dropdown',
                        value: null ,options: [ {label: '- nic -', value: null},
],                        default: null,
                                                    style: {
                    width: 6,
                                            widthLabel: 2
                                    },

                disabled: [ ]
            },            
                                                                                                                                
            {
                id: 'pouziti',
                label: 'Umístění',
                isDisabled: false,

                
                
                                        type: 'dropdown',
                        value: null ,options: [ {label: '- nic -', value: null},
    {label: 'vnitřní', value: 'vnitřní'},    {label: 'vnější', value: 'vnější'}],                        default: null,
                                                    style: {
                    width: 6,
                                            widthLabel: 2
                                    },

                disabled: [ ]
            }            
        ]
    },
        {
        type: 'section',
        label: 'Materiál',
        header: true,
        closable: true,
        opened: true,

        fields: [

            
                                                                                                                                
            {
                id: 'material',
                label: '',
                isDisabled: false,

                
                
                                        type: 'cloud',
                        value: [],options: [
    {label: 'dřevo', value: 'dřevo'},    {label: 'hliník', value: 'hliník'},    {label: 'ocel', value: 'ocel'},    {label: 'plast', value: 'plast'},    {label: 'žárově zinkovaný ocelový plech', value: 'žárově zinkovaný ocelový plech'},    {label: 'oboustraně zinkovaný ocelový plech', value: 'oboustraně zinkovaný ocelový plech'}],                        default:[],

                                                                        style: {
                    width: 12,
                                            widthLabel: 0
                                    },

                disabled: [ {
                           id: 'struktura',
                           data: [  'Rámy' ,  'Typ C3'  ]
                    }                ]
            }            
        ]
    }
    ];

