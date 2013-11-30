class LotusesController < ApplicationController
	def index
		Tracking.hit(request)
		Gabba::Gabba.new("UA-37815249-3", "gabba.tonelot.us").page_view("something", "gabba")

		render :index
	end
end