import { render, screen, within } from '@testing-library/react-native';
import RepositoryListContainer from '../components/Repository/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // 1. Render the container asynchronously
      await render(<RepositoryListContainer repositories={repositories} />);

      screen.debug();
      // 2. Query repository items using testID
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // 3. Verify that the correct number of items rendered
      await expect(repositoryItems).toHaveLength(2);

      // // 4. Assert first repository details (jaredpalmer/formik)
      await expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeTruthy();
      await expect(within(firstRepositoryItem).getByText(
        'Build forms in React, without the tears'
      )).toBeTruthy();

      
      await expect(within(firstRepositoryItem).getByText('TypeScript')).toBeTruthy();
      await expect(within(firstRepositoryItem).getByText('88')).toBeTruthy(); // or '1619' depending on how Stats formats numbers
      await expect(firstRepositoryItem).toHaveTextContent(/21\.9k/);
      await expect(firstRepositoryItem).toHaveTextContent(/88/);
      await expect(firstRepositoryItem).toHaveTextContent(/3/);

      // // // 5. Assert second repository details (async-library/react-async)
      await expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeTruthy();
      await expect(within(secondRepositoryItem).getByText(
        'Flexible promise-based React data loader'
      )).toBeTruthy();
      await expect(secondRepositoryItem).toHaveTextContent(/JavaScript/);
      await expect(secondRepositoryItem).toHaveTextContent(/69/);
      await expect(secondRepositoryItem).toHaveTextContent(/1\.8k/); // or '1760'
      await expect(secondRepositoryItem).toHaveTextContent(/72/);
      await expect(secondRepositoryItem).toHaveTextContent(/3/);
    });
  });
});