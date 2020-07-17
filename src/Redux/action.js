export function getStudent() {
    console.log('called');
    return dispatch => {
        return dispatch({
            type: 'GET_STUDENT'
        });
    }
};

export function addStudent(data) {
    return dispatch => {
        return dispatch({
            type: 'ADD_STUDENT',
            payload: data
        });
    }
};

export function editStudent(data) {
    return dispatch => {
        return dispatch({
            type: 'EDIT_STUDENT',
            payload: data
        });
    }
};

export function deleteStudent(studentesId) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_STUDENT',
            payload: studentesId
        });
    }
};