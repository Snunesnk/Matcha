export const reducer = (state, action) => {
    return action.type;

    // switch (action.type) {
    //     case 'increment':
    //         return { count: state.count + 1 };
    //     case 'decrement':
    //         return { count: state.count - 1 };
    //     default:
    //         throw new Error();
    // }
}
