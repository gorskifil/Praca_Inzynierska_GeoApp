export interface InstallationInfo {
  current: {
  fromDateTime: string,
    tillDateTime: string,
    values: [
    {
      name: string,
      value: 0
    }
  ],
    indexes: [
    {
      name: string,
      value: 0,
      level: string,
      description: string,
      advice: string,
      color: string
    }
  ],
    standards: [
    {
      name: string,
      pollutant: string,
      limit: 0,
      percent: 0,
      averaging: string
    }
  ]
},
  history: [
  {
    fromDateTime: string,
    tillDateTime: string,
    values: [
      {
        name: string,
        value: 0
      }
    ],
    indexes: [
      {
        name: string,
        value: 0,
        level: string,
        description: string,
        advice: string,
        color: string
      }
    ],
    standards: [
      {
        name: string,
        pollutant: string,
        limit: 0,
        percent: 0,
        averaging: string
      }
    ]
  }
],
  forecast: [
  {
    fromDateTime: string,
    tillDateTime: string,
    values: [
      {
        name: string,
        value: 0
      }
    ],
    indexes: [
      {
        name: string,
        value: 0,
        level: string,
        description: string,
        advice: string,
        color: string
      }
    ],
    standards: [
      {
        name: string,
        pollutant: string,
        limit: 0,
        percent: 0,
        averaging: string
      }
    ]
  }
]
}
