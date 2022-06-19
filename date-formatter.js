const formatDate = (p_date) => 
{
    let day = p_date.getDate();
    let month = p_date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let year = p_date.getFullYear();
    let hours = p_date.getHours();
    let minutes = p_date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

module.exports = formatDate;