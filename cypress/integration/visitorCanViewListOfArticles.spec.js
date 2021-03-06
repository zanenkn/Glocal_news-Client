describe('Visitor can view on the landing page', () => {

  it('a list of articles successfully', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/categories',
      response: 'fixture:categories_list.json',
      status: 200
    })
    cy.visit('http://localhost:3001')

    let articles = [
      ["#38", "#title_38", "#ingress_38"]
    ]

    articles.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
      })
    })
  })

  it('a relevant message if there are no articles in the API database', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:no_list_of_articles.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/categories',
      response: 'fixture:categories_list.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
    cy.contains('Be the first to post your own article and become a neighborhood journalist!')
  })
})
