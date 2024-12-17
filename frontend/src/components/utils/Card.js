export const card = (category, amount, limit) => {
    // Create card-container element and give it a class
    let cardContainer = document.createElement('article');
    cardContainer.classList.add('card-container');

    // 
    let categoryContainer = document.createElement('header');
    let amountContainer = document.createElement('p');

    categoryContainer.innerHTML = `<span>${category}</span>`
    amountContainer.innerHTML = `<span>$${amount}</span> / $${limit}`
    cardContainer.append(categoryContainer, amountContainer)
    return cardContainer
}