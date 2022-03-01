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
      name, type, image, averageWeight: { value, measurementUnit },
    }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`Type: ${type}`)).toBeInTheDocument();
      expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
        .toBeInTheDocument();
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
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }))
      .toHaveAttribute('src', '/star-icon.svg');
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }))
      .toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
