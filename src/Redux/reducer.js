const initialstate = {
    studentes: [
        { id: 1, Firstname: "Firstname 1", lastName: ".NET Team" , email: "Test@gmail.com", address: "", mobile: "", gender : "Female", dob: new Date(new Date().toDateString()), country : ""  , file:null},
        { id: 2, Firstname: "Student 2", lastName: "Mobile Team", email: "Test@gmail.com" , address: "", mobile: "", gender : "Female", dob: new Date(new Date().toDateString()), country : "", file:null},
        { id: 3, Firstname: "Student 3", lastName: "Design Team", email: "Test@gmail.com" , address: "", mobile: "", gender : "Female", dob: new Date(new Date().toDateString()), country : "", file:null}
    ]
};

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'GET_STUDENT':
            return {
                ...state
            };
        case 'ADD_STUDENT':
            return {
                ...state,
                studentes: state.studentes.concat(action.payload)
            };
        case 'EDIT_STUDENT':
            return {
                ...state,
                studentes: state.studentes.map(
                    (content, i) => content.id === action.payload.id ? {...content, Firstname : action.payload.Firstname , 
                         lastName : action.payload.lastName,
                           email : action.payload.email,
                           address : action.payload.address,
                           mobile : action.payload.mobile,
                           gender  : action.payload.gender 
                           , dob:action.payload.dob, 
                           country : action.payload.country
                         }
                                            : content)
            };
        case 'DELETE_STUDENT':
            return {
                ...state,
                studentes: state.studentes.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};

export default reducer;
