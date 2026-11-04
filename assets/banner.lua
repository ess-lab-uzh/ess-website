-- Page banner filter.
--
-- If a page's header has `banner: <image>`, put that image as a wide photo
-- at the top of the page, with the page title on it (and optionally
-- `banner-subtitle:` and `banner-credit:`), and hide Quarto's normal
-- title block. Pages without `banner:` are left untouched.

local function esc(s)
  return (s:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end

local function field(meta, key)
  if meta[key] == nil then return "" end
  return pandoc.utils.stringify(meta[key])
end

function Pandoc(doc)
  if not quarto.doc.is_format("html") then return doc end
  local img = field(doc.meta, "banner")
  if img == "" then return doc end

  local title    = esc(field(doc.meta, "title"))
  local subtitle = field(doc.meta, "banner-subtitle")
  local credit   = field(doc.meta, "banner-credit")

  local html = '<div class="page-banner">'
    .. '<div class="page-banner-photo" style="background-image:url(\'' .. esc(img) .. '\');">'
  if credit ~= "" then
    html = html .. '<div class="banner-credit">' .. esc(credit) .. '</div>'
  end
  html = html .. '</div>'
    .. '<div class="page-banner-title"><h1>' .. title .. '</h1>'
  if subtitle ~= "" then
    html = html .. '<p class="banner-subtitle">' .. esc(subtitle) .. '</p>'
  end
  html = html .. '</div></div>'

  table.insert(doc.blocks, 1, pandoc.RawBlock("html", html))
  table.insert(doc.blocks, 1, pandoc.RawBlock("html",
    "<style>#title-block-header{display:none;}</style>"))
  return doc
end
