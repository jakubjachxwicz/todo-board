document.querySelector('#btn_save').addEventListener('click', (event) => {
    event.preventDefault();
    
    const form = getForm();
    
    if (form.task_id.value === 'new') form.setAttribute('action', '/insert');
    else form.setAttribute('action', '/update');

    document.querySelector('.button_group').appendChild(form);
    form.submit();
})

document.querySelector('#btn_delete').addEventListener('click', () => {
    if (confirm('Czy napewno chcesz trwale usunąć to zadanie?'))
    {
        const id = document.querySelector('#task_idID').value;
        window.location.href = `/delete/${id}`;
    }
})

const getForm = () => {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    form.appendChild(document.querySelector('#titleID'));
    form.appendChild(document.querySelector('#contentID'));
    form.appendChild(document.querySelector('#completedID'));
    form.appendChild(document.querySelector('#colorID'));
    form.appendChild(document.querySelector('#task_idID'));

    return form;
}