require 'creek'

class Demilitarization

	attr_reader :code, :description

	def initialize
		@code = ""
		@description = ""
	end

	def toMySQL(tableName)
		return "INSERT into #{tableName} (#{@code}, #{@description}) values (\"#{@code}\", \"#{@description}\");"
	end

	def toElixir

	end

	def parseExcel(fileName)
	  creek = Creek::Book.new(fileName)
          creek.
		creek.sheets.each do |name|
			
		end
	end
end
