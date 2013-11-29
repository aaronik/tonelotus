class LotusesController < ApplicationController
	def index
		Tracking.hit(request)

		render :index
	end
end
