/* eslint-disable import/export */
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Router, Routes } from 'react-router-dom';
import type { InitialEntry, MemoryHistory } from 'history';
import { createMemoryHistory } from 'history';
import {
	AntennaProvider,
	AppProvider,
	ColorModeProvider,
	RxProvider,
	SignalProvider,
	TxProvider,
  UserProvider
} from "#context";

export interface ProviderOptions extends RenderOptions {
  initialEntries?: Array<InitialEntry>
  route?: string
}

interface ProvidersProps extends ProviderOptions {
  children: React.ReactNode
  history: MemoryHistory
}

const Providers = ({ children, history, route }: ProvidersProps) => {
  let Wrapper = (
    <>
      <ColorModeProvider>
      <UserProvider>
        <AppProvider>
          <SignalProvider>
            <AntennaProvider>
              <RxProvider>
                <TxProvider>
                {children}
                </TxProvider>
              </RxProvider>
            </AntennaProvider>
          </SignalProvider>
        </AppProvider>
      </UserProvider>
    </ColorModeProvider>
    </>
  )

  if (route) {
    Wrapper = (
      <Router location={history!.location} navigator={history!}>
        <Routes>
          <Route element={Wrapper} path={route} />
        </Routes>
      </Router>
    )
  }

  return Wrapper
}

const renderWithProviders = (
  ui: React.ReactElement,
  options: ProviderOptions = {},
) => {
  const { initialEntries = [], route, ...rest } = options;
  const history = createMemoryHistory({ initialEntries })

  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <Providers history={history} route={route}>
        {children}
      </Providers>
    ),
    ...rest,
  })

  return {
    ...rtl,
    rerender: (reUI: React.ReactElement, rerenderOptions?: ProviderOptions) =>
      renderWithProviders(reUI, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
    history
  }
}

export { screen } from '@testing-library/react'
export { renderWithProviders as render, userEvent as user }