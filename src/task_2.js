import React, { useReducer } from 'react';

const style = {
    table: {
        borderCollapse: 'collapse',
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px',
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px',
        },
        inputs: {
            marginBottom: '5px',
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px',
        },
    },
};

function PhoneBookForm({ addContact }) {
    const checkFormValidityAndSubmit = (e) => {
        //using uncontrolled elements,
        //and getting values using primitive way of getting values
        const fn = e.target.elements.userFirstname.value;
        const ln = e.target.elements.userLastname.value;
        const ph = e.target.elements.userPhone.value;

        if (!fn || !ln || !ph) {
            alert('All fields are required.');
            return;
        }

        const phoneRegEx =
            /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (!phoneRegEx.test(ph)) {
            alert('Please enter a valid phone number');
            return;
        }

        //adding contact to state
        addContact(fn, ln, ph);

        //reset form after submit
        e.target.reset();
    };

    //using html form's onsubmit function
    const onSubmit = (e) => {
        //to prevent page refresh on form's submit
        e.preventDefault();

        checkFormValidityAndSubmit(e);
    };

    return (
        <form style={style.form.container} onSubmit={onSubmit}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userFirstname"
                name="userFirstname"
                type="text"
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userLastname"
                name="userLastname"
                type="text"
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userPhone"
                name="userPhone"
                type="text"
            />
            <br />
            <input
                style={style.form.submitBtn}
                className="submitButton"
                type="submit"
                value="Add User"
            />
        </form>
    );
}

function InformationTable({ contacts, deleteContact }) {
    return (
        <table style={style.table} className="informationTable">
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id} id={contact.id}>
                        <td style={style.tableCell}>{contact.firstName}</td>
                        <td style={style.tableCell}>{contact.lastName}</td>
                        <td style={style.tableCell}>{contact.phone}</td>
                        <td style={style.tableCell}>
                            <button onClick={() => deleteContact(contact.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const initialState = {
    contacts: [],
};

const ActionTypes = {
    ADD: 'add',
    DEL: 'delete',
};

function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.ADD: {
            //smallest and quickest way to generate a unique Id
            //may not necessarily define non collision but for our case it will be enough
            var id = 'id' + Math.random().toString(16).slice(2);

            return {
                ...state,
                contacts: [...state.contacts, { ...action.contact, id }],
            };
        }
        case ActionTypes.DEL: {
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.id
                ),
            };
        }
        default:
            return state;
    }
}

export default function Task_2(props) {
    // using useReducer so it's easier to add more actions and handle form events more cleanly
    const [{ contacts }, dispatch] = useReducer(reducer, initialState);

    const addContact = (fname, lname, phone) => {
        if (checkIfContactExists(fname, lname)) {
            alert(`Contact ${fname} ${lname} already exists`);
            return;
        }

        dispatch({
            type: ActionTypes.ADD,
            contact: { firstName: fname, lastName: lname, phone },
        });
    };

    const deleteContact = (id) => {
        dispatch({ type: ActionTypes.DEL, id });
    };

    const checkIfContactExists = (fname, lname) => {
        return (
            contacts.findIndex(
                (contact) =>
                    contact.firstName === fname && contact.lastName === lname
            ) > -1
        );
    };

    return (
        <section>
            <PhoneBookForm addContact={addContact} />
            <InformationTable
                contacts={contacts}
                deleteContact={deleteContact}
            />
        </section>
    );
}
