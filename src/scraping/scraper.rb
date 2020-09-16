require 'httparty'
require 'nokogiri'
require 'byebug'
require 'csv'

csv = CSV.open('covid.csv','wb') 
  csv<<['provincia','casos']

  url="https://as.com/diarioas/2020/07/24/actualidad/1595608570_391268.html"
  unparsed_page= HTTParty.get(url)
  parsed_page= Nokogiri::HTML(unparsed_page)


  parsed_page.css(".img-tres-col").css(".compacta").each do |row| 
    nums = row.css("tr").each do |rows|
        col=rows.css("td")[0].text
        col=rows.css("td")[1].text
        contagio={
            provincia: col=rows.css("td")[0].text,
            contagios: col=rows.css("td")[1].text
        }
        csv<<[contagio[:provincia],contagio[:contagios]]
    end
end


