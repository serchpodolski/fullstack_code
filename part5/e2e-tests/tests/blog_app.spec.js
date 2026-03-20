const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({page, request}) => {
    await request.post('/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'salainen'
        }
    })
    await page.goto('/')
  })

  
  test('login form is shown', async ({ page }) => {
    const locator = page.getByRole('button', { name: 'log in' })
    await locator.click()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      // await page.getByRole('button', { name: 'log in' }).click()
      // await page.getByRole('textbox', { name: 'Username' }).fill('root')
      // await page.getByLabel('password').fill('salainen')
      // await page.getByRole('button', { name: 'login' }).click()
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('root logged in').first()).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      // await page.getByRole('button', { name: 'log in' }).click()
      // await page.getByRole('textbox', { name: 'Username' }).fill('wrong')
      // await page.getByLabel('password').fill('wrong')
      // await page.getByRole('button', { name: 'login' }).click()
      await loginWith(page, 'wrong', 'wrong')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // test.setTimeout(60000)
      await page.goto('/')
      await loginWith(page, 'root', 'salainen')
      await createBlog(page, {
        title: 'test blog',
        author: 'test author',
        url: 'test url'
      })
    })
    test('a new blog can be created', async ({ page }) => {
      const blog = page.locator('.blog-item').filter({ hasText: 'test blog' })
      await expect(blog).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      test.setTimeout(10000)
      const blog = page.locator('.blog-item').filter({ hasText: 'test blog' })
      await blog.getByRole('button', { name: 'view' }).click()

      const initialLikesText = await blog.locator('.likes-count-class').textContent()
      const initialLikes = parseInt(initialLikesText.match(/\d+/)[0], 10)

      await blog.getByRole('button', { name: 'like' }).click()
      await expect(blog.locator('.likes-count-class')).toContainText(`${initialLikes + 1} likes`)
    })
    test('a blog can be removed', async ({ page }) => {
      test.setTimeout(10000)
      const blogElement = page.locator('.blog-item').filter({ hasText: 'test blog' })
      await blogElement.getByRole('button', { name: 'view' }).click()
      const removeButton = blogElement.getByRole('button', { name: 'remove' })
      // page.on('dialog', async dialog => {
      //   expect(dialog.type()).toBe('confirm')
      //   // expect(dialog.message()).toContain('Remove blog')
      //   await dialog.accept()
      // })
      await expect(removeButton).toBeVisible({ timeout: 5000 })
      page.once('dialog', dialog => dialog.accept())
      await removeButton.click({ force: true })
      await expect(blogElement).not.toBeVisible()
    })
  
    test('only the creator can remove a blog', async ({ page, request }) => {
      test.setTimeout(10000)
      await request.post('http://localhost:3001/api/users', {
        data: {
          name: 'user1',
          username: 'user1',
          password: 'salainen'
        }
      })
      await page.evaluate(() => {
        window.localStorage.removeItem('loggedBlogappUser')
      })
      await page.reload()
      await loginWith(page, 'user1', 'salainen')
      const blog = page.locator('.blog-item').filter({ hasText: 'test blog' })
      await blog.getByRole('button', { name: 'view' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      // These tests were used in a former version where the remove button was visible to all logged users but only the creators were able to remove post
      // page.on('dialog', async dialog => {
      //   expect(dialog.type()).toBe('confirm')
      //   expect(dialog.message()).toContain('Remove blog')
      //   await dialog.accept()
      // })
      // await page.getByRole('button', { name: 'remove' }).click()
      // await expect(page.getByText('Could not remove blog', { exact: false }).first()).toBeVisible()
    })
  })
  describe('When several blogs exist', () => {

    beforeEach(async ({ page }) => {
      test.setTimeout(60000);
      await page.goto('/')
      await loginWith(page, 'root', 'salainen')

  // Create First Blog & Like 3 times
      await createBlog(page, { title: 'first blog', author: 'a1', url: 'u1' })
      const firstBlog = page.locator('.blog-item', { hasText: 'first blog' })
      await firstBlog.getByRole('button', { name: 'view' }).click()
      for (let i = 0; i < 2; i++) {
        await firstBlog.getByRole('button', { name: 'like' }).click()
        // Wait for the UI to update the count before next click
        await expect(firstBlog).toContainText(`${i + 1} likes`) 
      }

  // Create Second Blog & Like 2 times
      await createBlog(page, { title: 'second blog', author: 'a2', url: 'u2' })
      const secondBlog = page.locator('.blog-item').filter({ hasText: 'second blog' })
      await secondBlog.getByRole('button', { name: 'view' }).click()
      for (let i = 0; i < 3; i++) {
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await expect(secondBlog).toContainText(`${i + 1} likes`)
      }

  // Create Third Blog (0 likes)
      await createBlog(page, { title: 'third blog', author: 'a3', url: 'u3' })
      const thirdBlog = page.locator('.blog-item').filter({ hasText: 'third blog' })
      await thirdBlog.getByRole('button', { name: 'view' }).click()
    })
    test('blogs are ordered by likes', async ({ page }) => {
      // const blogLocators = page.locator('.blog-item')
      // console.log(blogLocators)
      // const viewButtons = page.getByRole('button', { name: 'view' })
      // const count = await viewButtons.count()
      // console.log(count)
      // for (let i = 0; i < count; i++) {
      //   await viewButtons.nth(i).click()
      // }
      // await expect(page.locator('.likes-count-class')).toHaveCount(3)
      const likesTexts = await page.locator('.likes-count-class').allTextContents()
      const likesNumbers = likesTexts.map(text => {
        const match = text.match(/\d+/)
        console.log(match)
        return match ? parseInt(match[0], 10) : 0
      })
      console.log("Likes numbers:", likesNumbers)
      const sortedLikesNumbers = [...likesNumbers].sort((a, b) => b - a)
      console.log("Sorted likes numbers:", sortedLikesNumbers)
      expect(likesNumbers).toEqual(sortedLikesNumbers)
    })
  })
})