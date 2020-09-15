require "open-uri"
require "nokogiri"
require "csv"
csv = CSV.open('sectores.csv','wb') 
  csv<<['sector']
  link= "https://es.wikipedia.org/wiki/Sectores_de_Guayaquil"
  documento = open(link)
  datos= documento.read
  parserd_content=Nokogiri::HTML(datos)
 
  parserd_content.css(".mw-body-content").css(".mw-content-ltr").css(".toc").map do |row| 
    x=row.css("tr").each do |col|
      colu=col.css("td").inner_text
      csv<<[colu]
    end
end