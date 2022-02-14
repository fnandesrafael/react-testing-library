import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';

describe('06 - Testa o componente Pokemon.js', () => {
  it(`Verifica se é renderizado um card com as informações
  de determinado pokémon.`, () => {
    renderWithRouter(<App />);

    pokemons.forEach(({
      type, name, image, averageWeight: { value, measurementUnit },
    }) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(screen.getByRole('img', { name: `${name} sprite` }))
        .toHaveAttribute('src', image);
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
  it(`Verifica se o card do Pokémon contém um link de navegação
  para exibir detalhes deste Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    history.goBack();
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  });
  it('Verifica se há uma estrela de favorito no pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    userEvent.click(screen.getByText(/pokémon favoritado\?/i));
    history.push('/');
    expect(screen.getByTestId('favorite-star')).toHaveAttribute('src', '/star-icon.svg');
    expect(screen.getByTestId('favorite-star'))
      .toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
