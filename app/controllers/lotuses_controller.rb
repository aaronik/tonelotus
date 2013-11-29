class LotusesController < ApplicationController
	def index
		Tracking.hit(request)
		Gabba::Gabba.new("UA-37815249-2", "the.tonelot.us").page_view("something", "track/me")

		render :index
	end
end
