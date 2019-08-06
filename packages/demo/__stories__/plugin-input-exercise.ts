import { addStory } from '../src'

addStory('Plugins/Input Exercise/Initial State', {
  state: {
    plugin: 'rows',
    state: [
      {
        plugin: 'inputExercise'
      }
    ]
  }
})

addStory('Plugins/Input Exercise/Prefilled', {
  state: JSON.parse(
    '{"plugin":"rows","state":[{"plugin":"text","state":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Hier könnte Ihre Frage stehen:","marks":[]}]}]}]}}},{"plugin":"inputExercise","state":{"type":"Text","correctAnswers":["42"],"wrongAnswers":[{"value":"1","feedback":{"plugin":"text","state":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Viel zu wenig!!","marks":[]}]}]}]}}}},{"value":"2","feedback":{"plugin":"text","state":{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"s.o.","marks":[{"object":"mark","type":"@splish-me/strong","data":{}}]}]}]}]}}}}]}}]}'
  )
})