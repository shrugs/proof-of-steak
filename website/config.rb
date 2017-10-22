require 'dotenv'
Dotenv.overload(".env.#{config.environment.to_s}")

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :external_pipeline,
  name: :webpack,
  command: build? ?
  'webpack --bail -p' :
  'webpack --watch -d --progress --color',
  source: '.tmp/dist',
  latency: 1

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/*.pdf', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

activate :directory_indexes
activate :imageoptim

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

helpers do
  def donation_address
    ENV['DONATION_ADDRESS']
  end

  def personal_address
    ENV['PERSONAL_ADDRESS']
  end

  def ga_id
    ENV['GA_ID']
  end
end

configure :development do
end

configure :staging do
end

configure :production do
end

configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  activate :favicon_maker do |f|
    f.template_dir  = 'source/images'
    f.icons = {
      "steak-token.png" => [
        { icon: "apple-touch-icon-180x180-precomposed.png" },
        { icon: "apple-touch-icon-152x152-precomposed.png" },
        { icon: "apple-touch-icon-144x144-precomposed.png" },
        { icon: "apple-touch-icon-114x114-precomposed.png" },
        { icon: "apple-touch-icon-72x72-precomposed.png" },
        { icon: "favicon.png", size: "16x16" },
        { icon: "favicon.ico", size: "64x64" },
      ],
    }
  end
end

