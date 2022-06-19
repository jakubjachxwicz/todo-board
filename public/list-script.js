document.querySelector('#filter_button_ID').addEventListener('click', () => {
    let hide = document.querySelector('#ckb_hide_ID').checked;
    let sort = document.querySelector('#rd_asc_ID').checked;

    let url = `/?hide=${hide}&asc=${sort}`;
    window.location.href = url;
})