document.querySelector('#btn_save').addEventListener('click', (event) => {
    event.preventDefault();
    
    const form = getForm();
    
    form.setAttribute('action', '/update');
    document.querySelector('.button_group').appendChild(form);
    form.submit();
})

document.querySelector('#btn_delete').addEventListener('click', () => {
    
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