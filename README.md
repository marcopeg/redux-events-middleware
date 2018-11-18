# redux-events-middleware

The general idea is to use `redux` as an **event emitter** for our application.

In a way this is exactly the original idea of redux for many reducers can handle
the same action and do stuff with their own piece of the state.

But what about indirect side effects?

_Side effects must be avoided!_ they say, IMHO this is not always the case.
Side effects make your code less entangled and improve simplicity. With the
help of some regression tests it is also easy to keep side effects under control
and avoid classic pitfalls like event names misspells or duplication.

Event emitters and side effect are powerful tools, and **with great power comes
great responsability** (Voltaire? Spider Man? Churchill? ...)

## Add it to your redux store

```
const events = new ReduxEvents()
const eventsMiddleware = events.createReduxMiddleware({ ..context.. })

const middlewares = [
    reduxThunk,
    eventsMiddleware,
    ...
]
```

Yes it is that simple. Just a middleware creator function. The only parameter
is a **context object** that will be then given to each callback.

I normally use the context to forward the history instance allowing my side
effects to perform app navigation actions.

## Add listeners

```
const myFirstListener = {
    type: '@@FOO',
    handler: (action, ctx) => (dispatch, getState) => {
        console.log(action)
        console.log(ctx)
    },
}

events.registerListener([ myFirstListener ])
```

A listener is a simple declaration of "when action XXX fires, do YYY".

The structure of a listener definition is similar to a
[redux-thunk](https://github.com/reduxjs/redux-thunk) so you can avoid
learning yet one more concept. We have enough already, right?

## Who uses this?

This middleware is required if you are giving a go to the [react-redux-feature](https://www.npmjs.com/package/react-redux-feature) and it is also implemented
by default in [create-react-app-ssr](https://www.npmjs.com/package/create-react-app-ssr).

