var FilterStructure = [

    {
        type: 'section',
        label: 'velikosti z externího konfigu',
        header: true,
        closable: true,
        opened: true,

        fields: [
            // prvek pole
            {
                id: 'objektB',
                label: 'Můj slider',
                type: 'slider',
                value: 10,
                default: 10,

                options: {
                    showTicks: true,
                    ceil: 20,
                    floor: 0
                },

                style: {
                    width: 12
                },

                disabled: [
                    { handle_id: ['handle_id_value', 'handle_id_value', 'handle_id_value'] }
                ]

            },

        ]
    }
];


var FilterConfig = [

    {
        type: 'section',
        label: 'velikosti z externího konfigu',
        header: true,
        closable: true,
        opened: true,
        fields: [

            {
                id: 'objektB',
                label: 'Můj slider',
                type: 'slider',
                value: 10,
                default: 10,
                options: {
                    showTicks: true,
                    ceil: 20,
                    floor: 0
                },
                style: {
                    width: 12
                },

                disabled: [
                    {handle_id: ['handle_id_value', 'handle_id_value', 'handle_id_value']}
                ]

            },

            {
                id: 'objektB',
                label: 'Můj slider',
                type: 'slider',
                value: 2,
                default: 2,
                options: {
                    showTicks: true,
                    stepsArray: [0, 10, 12, 18]
                },
                style: {
                    width: 12
                },
                disabled: []

            },

            {
                id: 'objektB',
                type: 'dropdown',
                style: {
                    width: 10
                },
                value: [],
                options: [
                    {label: 'label2', value: 1000},
                    {label: 'label3', value: 100},
                    {label: 'label4', value: 10},
                    {label: 'label5', value: 1},
                    {label: 'label6', value: 10000}
                ]

            },

            {
                type: 'label',
                id: 'objektB',
                label: 'Můj slider',
                style: {
                    width: 2
                },
                disabled: []
            },

            {
                type: 'range',
                id: 'objektB',
                label: 'Můj ranger',
                min: 10,
                max: 20,
                defaultmin: 10,
                defaultmax: 20,
                options: {
                    floor: 0,
                    ceil: 30,
                    step: 2,
                    showTicks: true
                },

                style: {
                    width: 10
                }
            }

        ]
    },

    {
        type: 'section',
        label: 'rozměry',
        header: true,
        closable: true,
        opened: true,

        fields: [

            {
                type: 'label',
                id: 'objektB',
                label: 'Rozměry',
                help: 'cosi v helpu pro rozměry',
                style: {
                    width: 6
                }
            },

            {
                id: 'objektB',
                label: 'numero',
                type: 'number',
                value: 300,
                default: 300,

                style: {
                    width: 2,
                }

            },
            {
                id: 'objektB',
                label: 'hello1',
                type: 'number',
                value: 300,
                default: 300,

                style: {
                    width: 2,
                }

            },
            {
                id: 'objektB',
                label: 'hello',
                help: 'cosi v helpu',
                type: 'number',
                value: 300,
                default: 300,

                style: {
                    width: 2,
                }

            },


        ]
    },

    {
        type: 'section',
        label: 'váhy',
        header: true,
        closable: false,
        opened: true,
        fields: [
            {
                type: 'label',
                id: 'objektB',
                label: 'Rozměry',
                style: {
                    width: 2
                }
            },

            {
                id: 'objektB',
                type: 'number',
                value: 300,
                default: 300,

                style: {
                    width: 10
                }

            },

            {
                type: 'label',
                id: 'objektB',
                label: 'Rozměry',
                style: {
                    width: 4
                }
            },

            {
                type: 'number',
                id: 'objektB',
                value: 300,
                default: 300,

                style: {
                    width: 8
                }

            },

            {
                id: 'objektB',
                type: 'label',
                label: 'Rozměry',
                style: {
                    width: 6
                }
            },

            {
                id: 'objektB',
                type: 'number',
                value: 300,
                default: 300,

                style: {
                    width: 6
                }

            },


            {
                id: 'objektB',
                type: 'label',
                label: 'Rozměry',
                style: {
                    width: 2
                }
            },


            {
                id: 'objektB',
                type: 'cloud',
                style: {
                    width: 10
                },
                value: [],
                options: [
                    {label: 'label2', value: 1000},
                    {label: 'label3', value: 100},
                    {label: 'label4', value: 10},
                    {label: 'label5', value: 1},
                    {label: 'label6', value: 10000}
                ],

            }
        ]
    }
];

