(this["webpackJsonp@uiw/react-textarea-code-editor"]=this["webpackJsonp@uiw/react-textarea-code-editor"]||[]).push([[12],{599:function(e,n,t){"use strict";t.r(n),n.default="#include \"pch.h\"\n#include \"Direct3DBase.h\"\n\nusing namespace Microsoft::WRL;\nusing namespace Windows::UI::Core;\nusing namespace Windows::Foundation;\n\n// Constructor.\nDirect3DBase::Direct3DBase()\n{\n}\n\n// Initialize the Direct3D resources required to run.\nvoid Direct3DBase::Initialize(CoreWindow^ window)\n{\n    m_window = window;\n    \n    CreateDeviceResources();\n    CreateWindowSizeDependentResources();\n}\n\n// These are the resources that depend on the device.\nvoid Direct3DBase::CreateDeviceResources()\n{\n    // This flag adds support for surfaces with a different color channel ordering than the API default.\n    // It is recommended usage, and is required for compatibility with Direct2D.\n    UINT creationFlags = D3D11_CREATE_DEVICE_BGRA_SUPPORT;\n\n#if defined(_DEBUG)\n    // If the project is in a debug build, enable debugging via SDK Layers with this flag.\n    creationFlags |= D3D11_CREATE_DEVICE_DEBUG;\n#endif\n\n    // This array defines the set of DirectX hardware feature levels this app will support.\n    // Note the ordering should be preserved.\n    // Don't forget to declare your application's minimum required feature level in its\n    // description.  All applications are assumed to support 9.1 unless otherwise stated.\n    D3D_FEATURE_LEVEL featureLevels[] = \n    {\n        D3D_FEATURE_LEVEL_11_1,\n        D3D_FEATURE_LEVEL_11_0,\n        D3D_FEATURE_LEVEL_10_1,\n        D3D_FEATURE_LEVEL_10_0,\n        D3D_FEATURE_LEVEL_9_3,\n        D3D_FEATURE_LEVEL_9_2,\n        D3D_FEATURE_LEVEL_9_1\n    };\n\n    // Create the DX11 API device object, and get a corresponding context.\n    ComPtr<ID3D11Device> device;\n    ComPtr<ID3D11DeviceContext> context;\n    DX::ThrowIfFailed(\n        D3D11CreateDevice(\n            nullptr,                    // specify null to use the default adapter\n            D3D_DRIVER_TYPE_HARDWARE,\n            nullptr,                    // leave as nullptr unless software device\n            creationFlags,              // optionally set debug and Direct2D compatibility flags\n            featureLevels,              // list of feature levels this app can support\n            ARRAYSIZE(featureLevels),   // number of entries in above list\n            D3D11_SDK_VERSION,          // always set this to D3D11_SDK_VERSION\n            &device,                    // returns the Direct3D device created\n            &m_featureLevel,            // returns feature level of device created\n            &context                    // returns the device immediate context\n            )\n        );\n\n    // Get the DirectX11.1 device by QI off the DirectX11 one.\n    DX::ThrowIfFailed(\n        device.As(&m_d3dDevice)\n        );\n\n    // And get the corresponding device context in the same way.\n    DX::ThrowIfFailed(\n        context.As(&m_d3dContext)\n        );\n}\n\n// Allocate all memory resources that change on a window SizeChanged event.\nvoid Direct3DBase::CreateWindowSizeDependentResources()\n{ \n    // Store the window bounds so the next time we get a SizeChanged event we can\n    // avoid rebuilding everything if the size is identical.\n    m_windowBounds = m_window->Bounds;\n\n    // If the swap chain already exists, resize it.\n    if(m_swapChain != nullptr)\n    {\n        DX::ThrowIfFailed(\n            m_swapChain->ResizeBuffers(2, 0, 0, DXGI_FORMAT_B8G8R8A8_UNORM, 0)\n            );\n    }\n    // Otherwise, create a new one.\n    else\n    {\n        // Create a descriptor for the swap chain.\n        DXGI_SWAP_CHAIN_DESC1 swapChainDesc = {0};\n        swapChainDesc.Width = 0;                                     // use automatic sizing\n        swapChainDesc.Height = 0;\n        swapChainDesc.Format = DXGI_FORMAT_B8G8R8A8_UNORM;           // this is the most common swapchain format\n        swapChainDesc.Stereo = false; \n        swapChainDesc.SampleDesc.Count = 1;                          // don't use multi-sampling\n        swapChainDesc.SampleDesc.Quality = 0;\n        swapChainDesc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;\n        swapChainDesc.BufferCount = 2;                               // use two buffers to enable flip effect\n        swapChainDesc.Scaling = DXGI_SCALING_NONE;\n        swapChainDesc.SwapEffect = DXGI_SWAP_EFFECT_FLIP_SEQUENTIAL; // we recommend using this swap effect for all applications\n        swapChainDesc.Flags = 0;\n\n        // Once the desired swap chain description is configured, it must be created on the same adapter as our D3D Device\n\n        // First, retrieve the underlying DXGI Device from the D3D Device\n        ComPtr<IDXGIDevice1>  dxgiDevice;\n        DX::ThrowIfFailed(\n            m_d3dDevice.As(&dxgiDevice)\n            );\n\n        // Identify the physical adapter (GPU or card) this device is running on.\n        ComPtr<IDXGIAdapter> dxgiAdapter;\n        DX::ThrowIfFailed(\n            dxgiDevice->GetAdapter(&dxgiAdapter)\n            );\n\n        // And obtain the factory object that created it.\n        ComPtr<IDXGIFactory2> dxgiFactory;\n        DX::ThrowIfFailed(\n            dxgiAdapter->GetParent(\n                __uuidof(IDXGIFactory2), \n                &dxgiFactory\n                )\n            );\n\n\t\tWindows::UI::Core::CoreWindow^ p = m_window.Get();\n\n        // Create a swap chain for this window from the DXGI factory.\n        DX::ThrowIfFailed(\n            dxgiFactory->CreateSwapChainForCoreWindow(\n                m_d3dDevice.Get(),\n                reinterpret_cast<IUnknown*>(p),\n                &swapChainDesc,\n                nullptr,    // allow on all displays\n                &m_swapChain\n                )\n            );\n            \n        // Ensure that DXGI does not queue more than one frame at a time. This both reduces \n        // latency and ensures that the application will only render after each VSync, minimizing \n        // power consumption.\n        DX::ThrowIfFailed(\n            dxgiDevice->SetMaximumFrameLatency(1)\n            );\n    }\n    \n    // Obtain the backbuffer for this window which will be the final 3D rendertarget.\n    ComPtr<ID3D11Texture2D> backBuffer;\n    DX::ThrowIfFailed(\n        m_swapChain->GetBuffer(\n            0,\n            __uuidof(ID3D11Texture2D),\n            &backBuffer\n            )\n        );\n\n    // Create a view interface on the rendertarget to use on bind.\n    DX::ThrowIfFailed(\n        m_d3dDevice->CreateRenderTargetView(\n            backBuffer.Get(),\n            nullptr,\n            &m_renderTargetView\n            )\n        );\n\n    // Cache the rendertarget dimensions in our helper class for convenient use.\n    D3D11_TEXTURE2D_DESC backBufferDesc;\n    backBuffer->GetDesc(&backBufferDesc);\n    m_renderTargetSize.Width  = static_cast<float>(backBufferDesc.Width);\n    m_renderTargetSize.Height = static_cast<float>(backBufferDesc.Height);\n\n    // Create a descriptor for the depth/stencil buffer.\n    CD3D11_TEXTURE2D_DESC depthStencilDesc(\n        DXGI_FORMAT_D24_UNORM_S8_UINT, \n        backBufferDesc.Width,\n        backBufferDesc.Height,\n        1,\n        1,\n        D3D11_BIND_DEPTH_STENCIL);\n\n    // Allocate a 2-D surface as the depth/stencil buffer.\n    ComPtr<ID3D11Texture2D> depthStencil;\n    DX::ThrowIfFailed(\n        m_d3dDevice->CreateTexture2D(\n            &depthStencilDesc,\n            nullptr,\n            &depthStencil\n            )\n        );\n\n    // Create a DepthStencil view on this surface to use on bind.\n    DX::ThrowIfFailed(\n        m_d3dDevice->CreateDepthStencilView(\n            depthStencil.Get(),\n            &CD3D11_DEPTH_STENCIL_VIEW_DESC(D3D11_DSV_DIMENSION_TEXTURE2D),\n            &m_depthStencilView\n            )\n        );\n\n    // Create a viewport descriptor of the full window size.\n    CD3D11_VIEWPORT viewPort(\n        0.0f,\n        0.0f,\n        static_cast<float>(backBufferDesc.Width),\n        static_cast<float>(backBufferDesc.Height)\n        );\n        \n    // Set the current viewport using the descriptor.\n    m_d3dContext->RSSetViewports(1, &viewPort);\n}\n\nvoid Direct3DBase::UpdateForWindowSizeChange()\n{\n    if (m_window->Bounds.Width  != m_windowBounds.Width ||\n        m_window->Bounds.Height != m_windowBounds.Height)\n    {\n        m_renderTargetView = nullptr;\n        m_depthStencilView = nullptr;\n        CreateWindowSizeDependentResources();\n    }\n}\n\nvoid Direct3DBase::Present()\n{\n    // The first argument instructs DXGI to block until VSync, putting the application\n    // to sleep until the next VSync. This ensures we don't waste any cycles rendering\n    // frames that will never be displayed to the screen.\n    HRESULT hr = m_swapChain->Present(1, 0);\n\n    // If the device was removed either by a disconnect or a driver upgrade, we \n    // must completely reinitialize the renderer.\n    if (hr == DXGI_ERROR_DEVICE_REMOVED || hr == DXGI_ERROR_DEVICE_RESET)\n    {\n        Initialize(m_window.Get());\n    }\n    else\n    {\n        DX::ThrowIfFailed(hr);\n    }\n}\n"}}]);
//# sourceMappingURL=12.269d57a2.chunk.js.map