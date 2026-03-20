const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'log in' }).click()
  // await page.getByRole('textbox', { name: 'Username' }).fill(username)
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/login')
  )
  await page.getByRole('button', { name: 'login' }).click()
  const response = await responsePromise
  }

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'create a new blog' }).click()
  // await page.getByRole('textbox', { name: 'title' }).fill(content.title)
  // await page.getByRole('textbox', { name: 'author' }).fill(content.author)
  // await page.getByRole('textbox', { name: 'url' }).fill(content.url)
  await page.getByLabel(/title:/i).fill(content.title)
  await page.getByLabel(/author:/i).fill(content.author)
  await page.getByLabel(/url:/i).fill(content.url)
  await page.getByRole('button', { name: 'create' }).click()
  const expectedText = new RegExp(`${content.title} ${content.author}`, 'i')
  await page.getByText(expectedText).waitFor()
}


module.exports = { loginWith, createBlog }
