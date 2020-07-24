const servicesListData = () => {
  const repairTypesContent = document.querySelector('.popup-repair-types-content-table'),
    repairTypesDate = document.querySelector('.popup-repair-types-content__head-date'),
    navList = document.querySelector('.nav-list-popup-repair');

  fetch('./db/db.json')
    .then(response => response.json())
    .then(data => data)
    .then(data => {
      const dataDate = data[0]['date'].split('.');
      const date = new Date(`${dataDate[2]}-${+dataDate[1]}-${dataDate[0]}`);
      const repairTypesDateMessage = repairTypesDate.querySelector('i').cloneNode(true);
      repairTypesDate.textContent = `${date.getDate()} ${date.getMonth() === 2 || date.getMonth() === 7 ?
        date.toLocaleString('ru', { month: 'long' }) + 'а' :  date.toLocaleString('ru', { month: 'long' }).slice(0, -1) + 'я'} 
        ${date.getFullYear()}`;
      repairTypesDate.append(repairTypesDateMessage);

      navList.textContent = ``;

      data.forEach((item, i) => {
        if (!item.title) return;

        const navItem = document.createElement('button');
        navItem.classList.add('button_o');
        navItem.classList.add('popup-repair-types-nav__item');
        navItem.textContent = item.title;
        if (i === 1) navItem.classList.add('active');

        const contentTable = document.createElement('table'),
          tableBody = document.createElement('tbody');
        contentTable.classList.add('popup-repair-types-content-table__list');
        contentTable.append(tableBody);
        i === 1 ? contentTable.style.display = `table` : contentTable.style.display = `none`;

        navList.append(navItem);
        repairTypesContent.append(contentTable);
        item.priceList.forEach(item => {
          const tableRow = document.createElement('tr');
          tableRow.classList.add('mobile-row');
          tableRow.classList.add('showHide');
          tableRow.innerHTML = `
            <td class="repair-types-name">${item.typeService}</td>
            <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
            <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
            <td class="repair-types-value">${item.units[1] === `2` ? `${item.units[0]}<sup>${item.units[1]}</sup>` : item.units}</td>
            <td class="repair-types-value">${item.cost} руб.</td>
          `;
          tableBody.append(tableRow);
        });
      });

      const toggleServicesLists = () => {
        const tables = document.querySelectorAll('.popup-repair-types-content-table__list'),
          navItems = document.querySelectorAll('.popup-repair-types-nav__item'),
          switchInner = document.getElementById('switch-inner');

        const toggleTableContent = index => {
          navItems.forEach(item => item.classList.remove('active'));
          tables.forEach((item, i) => {
            if (index === i) {
              navItems[i].classList.add('active');
              switchInner.textContent = navItems[i].textContent;
              item.style.display = `table`;
            } else {
              item.style.display = `none`;
            }
          });
        };

        navList.addEventListener('click', event => {
          const target = event.target;

          if (target.matches('.popup-repair-types-nav__item')) {
            navItems.forEach((item, i) => {
              if (item === target) {
                toggleTableContent(i);
              }
            });
          }
        });
      };

      toggleServicesLists();

    });
};

export default servicesListData;
