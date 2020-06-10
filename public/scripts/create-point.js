// DADOS DA ENTIDADE

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then(states => {

    for ( state of states ) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
    }
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')

  const ufValue = event.target.value
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json())
  .then(cities => {

    for ( city of cities ) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
    }

    citySelect.disabled = false
  })
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)

  // ITENS DE COLETA

  const itemsToCollect = document.querySelectorAll('.items-grid li')

  for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
  }

  const collectedItems = document.querySelector('input[name=items]')

  let seletedItems = []

  function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover classe do li
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados

    // Se sim, pegar os itens selecionados
    const alreadySelected = seletedItems.findIndex( item => {
      const itemFound = item == itemId

      return itemFound
    })

    // Se já estiver selecionado (dentro do array selectedItems)
    if (alreadySelected >= 0) {
      const filteredItems = seletedItems.filter(item => {
        const itemIsDifferent = item != itemId

        return itemIsDifferent
      })

      seletedItems = filteredItems
    } else {
      // Se não estiver adicionado, adiciona à seleção
      seletedItems.push(itemId)
    }

    collectedItems.value = seletedItems
  }