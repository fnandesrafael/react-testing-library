import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('04 - Testa o componente NotFound.js', () => {
  it(`Verifica se a página contém um h2
  com o texto Page requested not found`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    expect(screen.getByRole(
      'heading',
      { name: /page requested not found crying emoji/i },
    ));
  });
  it(`Verifica se a página exibe a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    expect(screen.getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    )).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
