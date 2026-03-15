describe('Конструктор бургера', () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user' });
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.visit('/');
  });

  it('Добавление булки в конструктор', () => {
    cy.contains('Тестовая булка').parent().find('button').click();
    cy.get('[data-testid="constructor-bun-top"]').contains('Тестовая булка');
    cy.get('[data-testid="constructor-bun-bottom"]').contains('Тестовая булка');
  });

  it('Добавление начинки в конструктор', () => {
    cy.contains('Тестовая начинка').parent().find('button').click();
    cy.get('[data-testid="constructor-ingredients"]').contains('Тестовая начинка');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal"]').contains('Тестовая булка');
  });

  it('Закрытие по крестику', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Закрытие по оверлею', () => {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Создание заказа', () => {
    cy.intercept('POST', '**/api/orders', { fixture: 'order' });

    cy.contains('Тестовая булка').parent().find('button').click();
    cy.contains('Тестовая начинка').parent().find('button').click();
    cy.contains('Оформить заказ').click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal"]').contains('12345');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-bun-top"]').should('not.contain', 'Тестовая булка');
    cy.get('[data-testid="constructor-ingredients"]').should('not.contain', 'Тестовая начинка');
  });
});
